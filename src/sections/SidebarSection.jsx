import React, { useEffect } from 'react'
import {
  IoMdArrowForward,
  IoMdAdd,
  IoMdClose,
  IoMdRemove,
} from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { useState } from 'react';
import SidebarProductCard from '../components/SidebarProductCard';

const SidebarSection = ({cartItems, setCartItems, sidebarOpen, setSidebarOpen}) => {

  const handleClickSidebar = () => {
    setSidebarOpen(false)
  }

  useEffect(() => {
    console.log(cartItems);
  })

  const getTotalPrice = () => {
    let total = 0;
    cartItems.map((item) => (total += item.price));
    return total;
  }

  const totalPrice = getTotalPrice();

  const deleteCart = () => {
    setCartItems([]);
  }

  const handleCheckout = () => {
    alert(`Thank you for buying, your total is ${totalPrice}`)

    setCartItems([]);
  }
  
  return (
    <div>
      {/* Sidebar */}
      <div
        className={` ${
          sidebarOpen ? "right-0" : "-right-full"
        } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
      >
        <div className="flex items-center justify-between py-6 border-b">
          <div className="cursor-pointer w-8 h-8 flex justify-center items-center">
            <IoMdArrowForward
              className="text-2xl"
              onClick={handleClickSidebar}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">

          {cartItems.map((item, index) => (
            <SidebarProductCard 
              key={index}
              productData={item}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          ))}
        </div>

        <div className="flex flex-col gap-y-3  mt-4">
          <div className="flex w-full justify-between items-center">
            <div className="font-semibold">
              <span className="mr-2">Subtotal:</span> 
              $ {totalPrice}
            </div>
            <div className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl" onClick={deleteCart}>
              <FiTrash2 />
            </div>
          </div>
          <button className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarSection