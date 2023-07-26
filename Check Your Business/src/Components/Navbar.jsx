import React from "react";
import { Outlet, Link } from "react-router-dom";
// import ProductList from "./ProductList";
// import SignUp from "./SignUp";

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <Link to="/" className="text-decoration-none">
            <h1> Check Your Business</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Check Your Business
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3 align-items-center d-flex">
                <li className="nav-item">
                  <Link to="Products" className="text-decoration-none">
                    Product List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="text-decoration-none">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="Login" className="text-decoration-none">
                    Login
                  </Link>
                </li>
              </ul>
              <form className="d-flex mt-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      {/* <Outlet /> */}
    </>
  );
};

export default Navbar;
