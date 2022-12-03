import Sidebar from "./sidebar";
import "./backlog.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import Search from "../search";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TableProject from "./tableProject";
import axios from "axios";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <FaBars
          className="admin-header-icon"
          onClick={() => setCollapsed(!collapsed)}
        />
        <div className="admin-main">
          <div className="title">
            {" "}
            <div>Projects/Reactjs/Project manage </div>
            <span>
              <FaUser className="icon" />
              <Link to="/login">Login</Link>{" "}
            </span>
          </div>
          <div className="name"> Project backlog</div>
          <div className="heade-up">
            <h2> Your work</h2>
            <button className="btn btn-success" onClick={handleShow}>
              <AiOutlinePlusCircle /> create New Project
            </button>
          </div>
          <TableProject />
        </div>
      </div>
    </div>
  );
};

export default Admin;
