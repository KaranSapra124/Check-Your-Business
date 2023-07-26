import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EmailPass, FbAuth } from "./FireBase/FireDb";

const SignUp = () => {
  const [EmailInp, setEmailInp] = useState("");
  const [PassInp, setPassInp] = useState("");
  const [RePass, setRePass] = useState("");
  const [RePassInp, setRePassInp] = useState("");

  const [EmailVal, setEmailVal] = useState("");
  const [PassVal, setPassVal] = useState("");

  function EmailInput(e) {
    setEmailInp(e.target.value);
    setEmailVal(EmailInp);
  }
  function PassInput(e) {
    setPassInp(e.target.value);
    setPassVal(PassInp);
  }
  function RePassInput(e) {
    setRePassInp(e.target.value);
    setRePass(EmailInp);
  }
  const AuthUser = () => {
    if (PassInp === RePassInp) {
      // import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

      const auth = FbAuth;
      EmailPass(auth, EmailInp, PassInp)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Success", user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error", errorCode, errorMessage);

          // ..
        });
    }
  };
  return (
    <>
      <section className="h-100 pt-2" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              required
                              onChange={EmailInput}
                              value={EmailInp}
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              required
                              onChange={PassInput}
                              value={PassInp}
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              required
                              onChange={RePassInput}
                              value={RePassInp}
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        {/* <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div> */}

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            onClick={AuthUser}
                            type="button"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                        <div>
                          <Link to="/Login">Already Have an account </Link>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
