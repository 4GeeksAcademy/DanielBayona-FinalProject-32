// import React from 'react';
import React, { useState } from "react";
import Logo from "../../img/Logo.png";
import "../../styles/supervisorNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faRightFromBracket,
    faUsers,
    faBug,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/supervisorNavBar.css";

 
export const Sidebar = () => {
    const [activeItem, setActiveItem] = useState(0);
    const handleChangeColor = (index) => {
        setActiveItem(index)
  
    }
    return ( 
        
        <>
            <div className="sidebar d-flex flex-column justify-content-between p-4">

                    <div className="logo align-self-center">
                            <img  
                                className='logo-img' 
                                src={Logo}
                                style={{width: "150px", height: "144px"}} 
                                alt="logo de taskyist" />
                    </div>
                    <div className="menu position-relative top-100" >
                        <ul className='align-self-start'>
                            <li 
                                className={ `nav-item ${activeItem === 0 ? "active" : "" }`}
                                onClick={() => handleChangeColor(0)}
                            >
                               <a 
                                className={`${activeItem === 0 ? "text-white" : "text-dark"}`}
                                href="#">
                                        <FontAwesomeIcon icon={faHouse} className="pe-2 text-dark " />
                                        <span className='link-name text-dark fst-italic fw-bolder '>HOME</span>
                               </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faBug} className="pe-2 text-dark " />
                                    <span className='link-name  text-dark fst-italic fw-bolder ' >BUG</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                <FontAwesomeIcon icon={faUsers} className="pe-2 text-dark " />
                                {/* <i class="fa-solid fa-users me-2 mb-2 text-dark pe-2"></i> */}
                                    <span className='link-name text-dark fst-italic fw-bolder'>USERS</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="out">
                        <ul>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faRightFromBracket} className="pe-2 text-dark " />
                                    <span className='link-name text-dark' >Log out</span>  
                                </a>
                                      
                            </li>
                        </ul>
                    </div>

            </div>
        
        </>
    )
}



export default Sidebar;