import React from 'react'
import {
  IoMdArrowForward,
  IoMdAdd,
  IoMdClose,
  IoMdRemove,
} from "react-icons/io";

const SidebarProductCard = ({productData, cartItems, setCartItems}) => {

    const handleAddItem = () => {
      const updateCart = cartItems.map((item) =>
        item.id === productData.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updateCart);
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
    };

    const handleRemoveItem = () => {
      const updateCart = cartItems.map((item) =>
        item.id === productData.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartItems(updateCart);
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
    };

    const handleRemoveItemType = () => {
        const updateCart = cartItems.filter((item) => item.id !== productData.id);
        setCartItems(updateCart);
        localStorage.setItem("cartItems", JSON.stringify(updateCart));

        console.log(cartItems)
    }

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <div>
          <img className="max-w-[80px]" src={productData.image} alt="" />
        </div>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <div className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline">
              {productData.title}
            </div>
            <div
              className="text-xl cursor-pointer"
              onClick={handleRemoveItemType}
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div
                className="h-full flex-1 flex justify-center items-center cursor-pointer"
                onClick={handleRemoveItem}
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {productData.quantity}
              </div>
              <div
                className="h-full flex flex-1 justify-center items-center cursor-pointer"
                onClick={handleAddItem}
              >
                <IoMdAdd />
              </div>
            </div>
            {/* item price */}
            <div className="flex flex-1 justify-around items-center">
              $ {productData.price}
            </div>
            {/* final price */}
            <div className="flex flex-1 justify-end items-center text-primary font-medium">{`$ ${parseFloat(
              productData.quantity * productData.price
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarProductCard