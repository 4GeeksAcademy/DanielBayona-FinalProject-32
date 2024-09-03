import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";


import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Admin from "./pages/Admin.jsx"
import Supervisor from "./pages/supervisor.jsx"
import Worker from "./pages/worker.jsx"


import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";


    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
        return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        {/* <Route element={<Home />} path="/" /> */}
                        <Route element={<Login />} path="/login" />
                        <Route element={<Admin />} path="/admin" />
                        <Route element={<Supervisor />} path="/supervisor" />
                        <Route element={<Worker />} path="/worker" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
