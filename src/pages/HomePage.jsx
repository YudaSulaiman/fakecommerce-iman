import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import BannerSection from '../sections/BannerSection';
import axios from "axios";
import { useOutletContext } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [toastMessage, setToastMessage] = useState("");

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);

  const [cartItems, setCartItems] = useOutletContext();

  const pageButtonStyle = (page) => {
    return currentPage == page
      ? "mx-1 px-6 py-4 rounded shadow text-white bg-cyan-dark font-bold"
      : "mx-1 px-6 py-4 rounded shadow text-black bg-white";
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addToCart = (product) => {
    const newItem = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    };

    if (cartItems.find((item) => item.id === newItem.id)) {
      const updateCart = cartItems.map((item) =>
        item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updateCart);
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
    } else {
      const updateCart = [...cartItems, { ...newItem, quantity: 1 }];
      setCartItems(updateCart);
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://fakestoreapi.com/products"
        );

        let duplicateProducts = [...response];
        for (let i = 1; i < 4; i++) {
          duplicateProducts = duplicateProducts.concat(
            response.map((product) => ({
              ...product,
              id: product.id + i * response.length,
            }))
          );
        }
        setProductList(duplicateProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product list:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(productList);
  });

  return (
    <div>
      <BannerSection />
      <div className="w-[100vw]">
        <section id="products" className="pt-[8rem]">
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-10 text-center">
              Explore Our Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-lg mx-auto">
              {loading && <span>Loading...</span>}

              {!loading &&
                currentItems.map((item, index) => (
                  <ProductCard
                    key={index}
                    productData={item}
                    addToCart={addToCart}
                  />
                ))}
            </div>
            <nav className="my-4">
              <ul className="flex justify-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <li key={index}>
                    <button
                      className={pageButtonStyle(index + 1)}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage