import React from "react";
import './admin.css'
import branelogo from "../../assets/logo.png"
import Avatarimg from "../../assets/Avatar.png"
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminComponent = () => {

    const location = useLocation();
    const getTitle = () => {
        switch (location.pathname) {
            case '/basic-configuration':
                return 'Basic Configuration';
            case '/upload-syllabus':
                return 'Upload Syllabus';
            case '/content-configuration':
                return 'Content Configuration';
            case '/content-upload':
                return 'Content Upload';
            case '/assessment-configuration':
                return 'Assessment Configuration';
            default:
                return 'Admin Panel';
        }
    };

    return (
        <>
            <section className="admin">
                <article className="admin__leftmenu">
                    <article className="admin__leftmenu__logo">
                        <img src={branelogo} alt="Brane Logo" />
                    </article>
                    <ul className="admin__leftmenu__navlist">
                        <li><Link to="/">HomePage</Link></li>
                        <li><Link to="/">LandingPage</Link></li>
                        <li><Link to="/basic-configuration">Basic Configuration</Link></li>
                        <li><Link to="/upload-syllabus">Upload Syllabus</Link></li>
                        <li><Link to="/content-configuration">Content Configuration</Link></li>
                        <li><Link to="/content-upload">Content Upload</Link></li>
                        <li><Link to="/assessment-configuration">Assessment Configuration</Link></li>

                    </ul>
                    <article className="admin__leftmenu__copyright">
                        Brane Admin Dashboard <br />
                        © 2023 All rights reserved.
                    </article>
                </article>
                <article className="admin__right">
                    <article className="admin__right__header">
                        <div className="admin__right__header__title">
                            {getTitle()}
                        </div>
                        <div className="admin__right__header__profile">
                            <div>
                                Super Admin
                            </div>
                            <div>
                                <img src={Avatarimg} alt="Profile Image" />
                            </div>
                        </div>
                    </article>

                    <article className="admin__right__content">
                        <form action="">
                            <Outlet />
                        </form>
                    </article>
                </article>
            </section>
        </>
    );
};

export default AdminComponent;
