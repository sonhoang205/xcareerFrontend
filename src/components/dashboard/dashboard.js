
import Nav from 'react-bootstrap/Nav';
import Language from "../header/language"
import NavDropdown from "react-bootstrap/NavDropdown";
import { dologout } from "../../redux/action/userAction"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Sidebar from "../backlog/sidebar";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.scss";
import { listUser } from "../util/apiService"

import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
const DashBoard = () => {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const islogin = useSelector((state) => state.user.islogin);
    const account = useSelector((state) => state.user.account);
    const [totalUser, setTotalUser] = useState("");

    const handleLogin = () => {
        navigate("/Login");
    };
    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(dologout())
        navigate("/");


    }
    const handleRegister = () => {
        navigate("/register");
    };
    const fetchData = async () => {
        let res = await listUser();
        if (res && res.data && res.data.success === 1) {
            console.log("res", res.data.data.length)
            setTotalUser(res.data.data.length)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


    const data = [
        {
            "name": "user",
            "total user": 10,
        },
        {
            "name": "Work Space",
            "total Work Space": 10,
        },


    ]



    return (

        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content">

                <div className="container container-workspace">
                    <div className="container-header">
                        <FaBars
                            className="admin-header-icon"
                            onClick={() => setCollapsed(!collapsed)}
                        />
                        <div className="container-header_right"> <Nav>

                            {islogin === false
                                ? (
                                    <>
                                        <button className="btn-login" onClick={() => handleLogin()}>
                                            {" "}
                                            Log in
                                        </button>
                                        <button className="btn-Signup" onClick={() => handleRegister()}>
                                            {" "}
                                            Sign up
                                        </button>
                                    </>
                                ) : (
                                    <NavDropdown
                                        title={`hi , ${account.username}`}
                                        id="basic-nav-dropdown"
                                    >

                                        <NavDropdown.Item onClick={() => handleLogout()}>Log Out</NavDropdown.Item>
                                    </NavDropdown>

                                )}
                            <Language />

                        </Nav>
                        </div>
                    </div>
                    <div className='dashboard-cotainer'>
                        <div className='tittle'> Analytics Dashboard
                        </div>
                        <div className='content'>
                            <div className='content-left'>
                                <div className='item'>
                                    <span className='item-text'> User</span>
                                    <span className='item-number'>10</span>

                                </div>
                                <div className='item'>
                                    <span className='item-text'>Work Space</span>
                                    <span className='item-number'>10</span>

                                </div>

                            </div>
                            <div className='content-right'>
                                <ResponsiveContainer width="55%" height={"100%"} >
                                    <BarChart data={data}>
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total user" fill="#8884d8" />
                                        <Bar dataKey="total Work Space" fill="#82ca9d" />


                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                        </div>
                    </div>


                </div>

            </div>
        </div>

    )
}

export default DashBoard