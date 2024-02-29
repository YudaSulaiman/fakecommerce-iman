import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useParams, Link, useOutletContext } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { productId } = useParams();

  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);

  const [cartItems, setCartItems] = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProductData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    const newItem = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    };

    if (cartItems.find((item) => item.id === newItem.id)){
      const updateCart = cartItems.map((item) =>
        item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updateCart)
      localStorage.setItem("cartItems", JSON.stringify(updateCart))
    }
    else {
      const updateCart = [...cartItems, { ...newItem, quantity: 1 }];
      setCartItems(updateCart)
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
    }

    alert(`Product added to cart!`);
  }

  return (
    <div>
      <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 max-h-screen flex flex-col items-center relative">
        <div className="w-[100vw] pl-20">
          <Link to={`/`}>
            <IoArrowBackCircle
              className="text-primary cursor-pointer"
              size={40}
            />

          </Link>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img
                className="max-w-[200px] lg:max-w-xs"
                src={productData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {productData.title}
              </h1>
              <div className="text-2xl text-red-500 font-medium mb-6">
                $ {productData.price}
              </div>
              <p className="mb-8">{productData.description}</p>
              <button onClick={() => addToCart(productData)} className="bg-primary py-4 px-8 text-white">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
