import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ isAllowed, redirectTo = "/signinup", children }) {
  console.log(isAllowed);
  // isAllowed = true;
  if (!isAllowed) {
    console.log(isAllowed);
    return <Navigate to={redirectTo} />;
  }

  return <div>{children ? children : <Outlet />}</div>;
}

export default PrivateRoute;
