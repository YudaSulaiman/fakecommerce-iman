import React from 'react'
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductCard = ({productData, addToCart}) => {

  const handleAddItem = () => {
    addToCart(productData);
  }

  return (
    <div>
      <div className="p-4">
        <div className="border border-[#e4e4e4] mb-4 relative overflow-hidden group transition rounded-lg">
          <div className="aspect-w-1 aspect-h-1 flex justify-center items-center p-[1rem]">
            <div className="w-[200px] h-[200px] flex justify-center items-center px-3">
              <img
                className="object-cover max-w-full max-h-full group-hover:scale-110 transition duration-300 rounded-lg"
                src={productData.image}
                alt=""
              />
            </div>
          </div>
          <div className="absolute top-1 -right-11 group-hover:right-2 flex flex-row justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              style={{ background: "transparent", boxShadow: "none" }}
              className="border-none p-0"
            >
              <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500 rounded-full">
                <BsPlus className="text-3xl" onClick={handleAddItem}/>
              </div>
            </button>
            <Link to={`/${productData.id}`}>
              <div className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl rounded-full">
                <BsEyeFill />
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div className="text-sm capitalize text-black mb-1">
            {productData.category}
          </div>
          <div>
            <Link to={`/${productData.id}`}>
              <h2 className="font-semibold mb-1">{productData.title}</h2>
            </Link>
          </div>
          <h2 className="font-semibold">$ {productData.price}</h2>
        </div>
      </div>{" "}
    </div>
  );
}

export default ProductCard