import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";



import Login from "./pages/login.jsx";
import Worker from "./pages/worker.jsx"
import AdminCreateUser from "./pages/adminCreateUser.jsx";
import AdminCreateIssue from "./pages/adminCreateIssue.jsx";
import SupervisorCreateWorker from "./pages/supervisorCreateWorker.jsx";
import SupervisorCreateCompany from "./pages/supervisorCreateCompany.jsx";
import AdminCreateSupervisor from "./pages/adminCreateSupervisor.jsx";
import AdminEditUser from "./pages/editUser.jsx";
import SupervisorHome from "./pages/supervisorHome.jsx";
import SupervisorEditCompany from "./pages/editCompany.jsx";


import injectContext from "./store/appContext";
import AdminGetUsers from "./pages/AdminGetUsers.jsx";

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
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<AdminGetUsers />} />
                        <Route path="/supervisor" element={<SupervisorHome />} />
                        <Route path="/worker" element={<Worker />} />
                        <Route path="/admin/CreateUser" element={<AdminCreateUser />} />
                        <Route path="/admin/CreateIssue" element={<AdminCreateIssue />} />
                        <Route path="/supervisor/CreateWorker" element={<SupervisorCreateWorker />} />
                        <Route path="/admin/CreateSupervisor" element={<AdminCreateSupervisor />} />
                        <Route path="/supervisor/CreateCompany" element={<SupervisorCreateCompany />} />
                        <Route path="/admin/editUser/:id" element={<AdminEditUser />} />
                        <Route path="/supervisor/editCompany/:id" element={<SupervisorEditCompany />} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
