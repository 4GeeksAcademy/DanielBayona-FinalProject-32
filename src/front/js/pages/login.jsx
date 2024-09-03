import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import Logo from "../../img/Logo.png";
import "../../styles/home.css";
import "../../styles/login.css";

export const Login = () => {
  return (
    <>
      <div className="container login-background">
        <div className="row d-flex justify-content-center align-content-center align-items-center flex-column">
          <img
            src={Logo}
            alt="Logo"
            className="align-items-center"
            style={{ width: "350px", height: "344px" }}
          />
          <div className="col-12 col-md-6">
            <form onSubmit="#">
              <div className="form-group mb-3">
                <label htmlFor="inputEmail" className="pb-2">
                  Email:
                </label>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  className="form-control back-color rounded-pill "
                  id="inputEmail"
                  name="email"
                  // value="#"
                  //onChange='#'
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="inputPassword" className="pb-2">
                  Password:
                </label>
                <input
                  type="text"
                  placeholder="********"
                  className="form-control back-color rounded-pill"
                  id="inputPassword"
                  name="password"
                  // value="#"
                  //onChange='#'
                />
              </div>
              <div className="d-flex justify-content-center pt-2">
                <button className="btn btn-secondary btn-lg">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
