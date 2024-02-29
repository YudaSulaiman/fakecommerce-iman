import React, { useState, useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { Outlet, Link } from "react-router-dom";
import SidebarSection from "../sections/SidebarSection";

const HeaderSection = () => {
  const [ cartItems, setCartItems ] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [scrolling, setScrolling] = useState(false)

  const handleLogOut = (e) => {
    e.preventDefault();

    localStorage.removeItem("isLogin");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickSidebar = () => {
    setSidebarOpen(true);
  }

  const getTotalItems = () => {
    let total = 0;
    cartItems.map((item) => (total += item.quantity));
    return total
  }

  const totalItems = getTotalItems();

  return (
    <div>
      {/* Header => Add fixed on classname */}
      <header
        className={`py-6 w-full z-10 lg:px-8 transition-all fixed ${scrolling ? "bg-white shadow-md" : "bg-none"}`}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <div>
            <div className="w-[40px]">
              <Link to={`/`}>
                <h1
                  style={{
                    fontFamily: '"Satisfy", cursive',
                    fontSize: "1.5rem",
                  }}
                >
                  Fakecommerce
                </h1>
              </Link>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="cursor-pointer flex relative">
              <BsBag className="text-2xl" onClick={handleClickSidebar}/>
              <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {totalItems}
              </div>
            </div>
            <div className="cursor-pointer flex relative">
              <CiLogout className="text-3xl" onClick={handleLogOut} />
            </div>
          </div>
        </div>
      </header>
      <Outlet context={[cartItems, setCartItems]}/>
      <SidebarSection 
        cartItems={cartItems}
        setCartItems={setCartItems}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
};

export default HeaderSection;
