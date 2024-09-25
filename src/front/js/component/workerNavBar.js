import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faList,
  faUserGroup,
  faPen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/workerNavBar.css";
import Logo from "../../img/Logo.png";

export const WorkerNavBar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [activeItem, setActiveItem] = useState(null);

  const handleChangeColor = (index) => {
    setActiveItem(index);
  };

  const handleLogout = () => {
    const response = actions.logout();

    if (response) {
      navigate("/")
    }
  }

  return (
    <nav className="navbar nav-bar-left navbar-left d-flex flex-column navbar-expand-lg">
      <div className="container-fluid flex-column">
        <a className="navbar-brand" href="#">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "150px", height: "144px" }}
            className="d-inline-block align-text-top"
          />
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav flex-column mt-5">
            <li
              className={`nav-item ${activeItem === 0 ? "active" : ""}`}
              onClick={() => handleChangeColor(0)}
            >
              <a
                className={`nav-link fst-italic fw-bolder ${activeItem === 0 ? "text-white" : "text-dark"
                  }`}
                aria-current="page"
                href="#"
              >
                <FontAwesomeIcon icon={faHouse} className="pe-2" />
                HOME
              </a>
            </li>
            <li
              className={`nav-item ${activeItem === 1 ? "active" : ""}`}
              onClick={() => handleChangeColor(1)}
            >
               <NavLink
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active transition text-white fst-italic fw-bolder"
                      : "nav-link inactive transition text-dark fst-italic fw-bolder"
                  }
                  to="/worker/CreateTask"
                >
                  <FontAwesomeIcon icon={faTasks} className="pe-2" />
                    CREATE TASKS
                  </NavLink>
            </li>
            <li className="nav-item bottom-item">
              <a
                className="nav-link text-dark fst-italic fw-bolder"
                aria-current="page"
                onClick={() => handleLogout()}
                role="button"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="pe-2" />
                LOG OUT
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default WorkerNavBar;
