import "./App.css";

import HeaderSection from "./sections/HeaderSection";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import SignInUpPages from "./pages/SignInUpPage";

const App = () => {
  const isLogin = localStorage.getItem("isLogin");
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    if (isLogin) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }

    const intervalId = setInterval(() => {
      const newIsLogin = localStorage.getItem("isLogin");

      if (newIsLogin) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isLogin]);

  const router = createBrowserRouter([
    {
      path: "/signinup",
      element: <SignInUpPages />,
    },
    {
      path: "/",
      element: (
        <PrivateRoute isAllowed={isAllowed}>
          <HeaderSection />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <PrivateRoute isAllowed={isAllowed}>
              <HomePage />
            </PrivateRoute>
          ),
        },
        {
          path: ":productId",
          element: (
            <PrivateRoute isAllowed={isAllowed}>
              <ProductPage />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

