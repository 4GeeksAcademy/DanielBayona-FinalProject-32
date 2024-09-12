import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import Logo from "../../img/Logo.png";
import "../../styles/home.css";
import "../../styles/login.css";
import Swal from "sweetalert2";

const initialState = {
  username: "",
  password: "",
};

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [user, setUser] = useState(initialState);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await actions.login(user);

      if (response === "worker") {
        navigate("/worker");
      } else if (response === "supervisor") {
        navigate("/supervisor");
      } else if (response === "administrator") {
        navigate("/admin");
      } else {
        Swal.fire({
          icon: "error",
          title: "User dosent exists",
          text: "Please Contact Admin for user cREATION",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="inputEmail" className="pb-2">
                  Email:
                </label>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  className="form-control back-color rounded-pill"
                  id="inputEmail"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="inputPassword" className="pb-2">
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="form-control back-color rounded-pill"
                  id="inputPassword"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-center pt-2">
                <button className="btn btn-secondary btn-lg" type="submit">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
