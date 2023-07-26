import React from "react";
import { useState, useReducer } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { EmailPass, FbAuth } from "./FireBase/FireDb";
import ProductList from "./ProductList";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [EmailVal, setEmailVal] = useState("");
  const [PassVal, setPassVal] = useState("");

  const HandleEmail = (e) => {
    setEmailVal(e.target.value);
  };
  const HandlePass = (e) => {
    setPassVal(e.target.value);
  };

  const AuthUser = async () => {
    const auth = FbAuth;
    await EmailPass(auth, EmailVal, PassVal)
      .then((userCredential) => {
        // Signed in
        setEmailVal("");
        setPassVal("");
        return navigate("/Products", { state: { EmailVal } });
        // const user = userCredential.user;
        // console.log("Success", user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error", errorCode, errorMessage);

        // ..
      });
    // }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample img"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                </div>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input
                    onChange={HandleEmail}
                    value={EmailVal}
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <input
                    onChange={HandlePass}
                    value={PassVal}
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center"></div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onClick={AuthUser}
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link to="/SignUp">Register</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          {/* <!-- Copyright --> */}
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
