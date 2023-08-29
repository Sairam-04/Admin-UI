import React, { useEffect } from "react";
import './admin.css'
import branelogo from "../../assets/logo.png"
import Avatarimg from "../../assets/Avatar.png"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAdmin, removeAdmin } from "../../utils/localstorage";
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();

const AdminComponent = () => {
    const navigate = useNavigate();
    const { token, role } = getAdmin();

    useEffect(() => {
        if (token && role) {
            navigate("/");
        } else {
            navigate("/login")
        }
    }, [])

    const location = useLocation();
    const getTitle = () => {
        switch (location.pathname) {
            case '/basic-configuration':
                return 'Basic Configuration';
            case '/upload-syllabus':
                return 'Upload Chapters Syllabus';
            case '/upload-topic-syllabus':
                return 'Upload Topics Syllabus'
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

    const handleLogout = () => {
        removeAdmin()
        navigate("/login")
    }

    return (
        <>
            {
                (token && role) ? (
                    <>
                        <section className="admin">
                            <article className="admin__leftmenu">
                                <article className="admin__leftmenu__logo">
                                    <img src={branelogo} alt="Brane Logo" />
                                </article>
                                <ul className="admin__leftmenu__navlist">
                                    <li><Link to="/homepage">HomePage</Link></li>
                                    <li><Link to="/landingpage">LandingPage</Link></li>
                                    <li><Link to="/basic-configuration">Basic Configuration</Link></li>
                                    <li><Link to="/upload-syllabus">Upload Chapters Syllabus</Link></li>
                                    <li><Link to="/upload-topic-syllabus">Upload Topics Syllabus</Link></li>
                                    <li><Link to="/content-configuration">Content Configuration</Link></li>
                                    <li><Link to="/content-upload">Content Upload</Link></li>
                                    <li><Link to="/assessment-configuration">Assessment Configuration</Link></li>
                                    <li><button onClick={handleLogout} type="button">Logout</button></li>

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
                                        {
                                            (role === "super_admin") ?
                                                (
                                                    <div>
                                                        Super Admin
                                                    </div>
                                                ) : (
                                                    <div>
                                                        Operation Admin
                                                    </div>
                                                )
                                        }
                                        <div>
                                            <img src={Avatarimg} alt="Profile Image" />
                                        </div>
                                    </div>
                                </article>

                                <article className="admin__right__content">
                                    <QueryClientProvider client={queryClient} >
                                        <Outlet />
                                    </QueryClientProvider>

                                </article>
                            </article>
                        </section>
                    </>
                ) :
                    null
            }
        </>
    );
};

export default AdminComponent;
