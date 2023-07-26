import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
// import App from "./App";
import ProductList from "./Components/ProductList";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ProductData from "./Components/ProductData";
import UpdateData from "./Components/UpdateData";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <SignUp />
      },
      {
        path: "Products",
        element: <ProductList />
        // errorElement: <SignUp />
      },
      {
        path: "Login",
        element: <Login />
        // errorElement: <SignUp />
      },
      {
        path: "/ProductData",
        element: <ProductData />
      },
      {
        path: "/UpdateData",
        element: <UpdateData />
      }
    ]
    // errorElement: <SignUp />
  }
]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
