import React, { useState } from "react";
import Logo from "../../img/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faRightFromBracket,
    faUsers,
    faBug,
} from "@fortawesome/free-solid-svg-icons";
import  '../../styles/admin.css'

 
export const Sidebar = () => {
    return ( 
        
        <>
            <div className="sidebar p-4">

                    <div className="logo align-self-center ms-2">
                            <img  
                                className='logo-img d-block' 
                                src={Logo}
                                style={{width: "150px", height: "144px"}} 
                                alt="logo de taskyist" /> 
                    </div>
                        <ul className='  d-flex flex-column align-items-start mt-5 p-0' style={{height:"500px"}}>
                            <li>    
                               <a   className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faHouse} className="pe-2" />
                                    <span>HOME</span>
                               </a>
                            </li>
                            <li className="text-dark fst-italic fw-bolder ">
                                <a className=" nav-link text-dark" href="#">
                                        <FontAwesomeIcon icon={faBug} className="pe-2" />
                                        <span>BUGS</span>
                                </a>
                            </li>
                            <li className="text-dark fst-italic fw-bolder ">
                                <a className="text-dark  nav-link" href="#">
                                        <FontAwesomeIcon icon={faUsers} className="pe-2" />
                                        <span>USERS</span>
                                </a>
                            </li>
                            <li className="text-dark fst-italic fw-bolder mt-auto p-2 ">
                                <a className="text-dark" href="#">
                                        <FontAwesomeIcon icon={faRightFromBracket} className="pe-2" />
                                        <span>LOG OUT</span>
                                </a>
                            </li>

                        </ul>
            </div>
        
        </>
    )
}



export default Sidebar;