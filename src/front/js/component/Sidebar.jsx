import React from 'react'
import taskyist from '../../img/taskyist.png'


const Sidebar = () => {
    return ( 
        
        <>
            <div className="sidebar d-flex flex-column justify-content-between p-4">

                    <div className="logo align-self-center">
                            <img  className='logo-img' src={taskyist} alt="logo de taskyist" />
                    </div>
                    <div className="menu position-relative top-100" >
                        <ul className='align-self-start'>
                            <li>
                               <a href="#">
                                <i class="fa-solid fa-house me-2 mb-2 text-dark"></i>
                                <span className='link-name text-dark'>Home</span>
                               </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa-solid fa-bug me-2 mb-2 text-dark "></i>
                                    <span className='link-name text-dark' >Bug</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                <i class="fa-solid fa-users me-2 mb-2 text-dark"></i>
                                    <span className='link-name text-dark '>Users</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="out">
                        <ul>
                            <li>
                                <a href="#">
                                    <i class="fa-solid fa-right-from-bracket me-2 mb-2 text-dark "></i>
                                    <span className='link-name text-dark' >Log out</span>  
                                </a>
                                      
                            </li>
                        </ul>
                    </div>

            </div>
        
        </>
    )
}



export default Sidebar