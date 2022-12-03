import Sidebar from "../backlog/sidebar";
import "./Board.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import ListGroup from "./list-group";
import { useState } from "react";
import Search from "../search";
import { Link } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

const Board = () => {
  const [collapsed, setCollapsed] = useState(false);
  const params = useParams();
  const location = useLocation();
  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);
  const [isOpenCreatColumn, setIsOpenCreatColumn] = useState(false);
  const handleCreatNewColumn = () => {
    setIsOpenCreatColumn(!isOpenCreatColumn);
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
            <div className="name">
              {" "}
              Project : {location?.state.nameWorkProject}{" "}
            </div>
            {islogin === true ? (
              <>
                <b
                  style={{ marginRight: "50px" }}
                >{`Hi , ${account.username}`}</b>{" "}
              </>
            ) : (
              <>
                {" "}
                <span>
                  {" "}
                  <FaUser className="icon" />
                  <Link to="/login">Login</Link>{" "}
                </span>{" "}
              </>
            )}
          </div>
          <Search />

          <div className="line">

            {/* <DropdownButton id="dropdown-basic-button" title="(4)&nbsp;user">
              <Dropdown.Item href="#/action-1">Sơn</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Hiếu</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Đạt</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Huy</Dropdown.Item>
            </DropdownButton>
            <button type="button" class="btn btn-light button  ">
              <div>
                <IoIosPersonAdd /> invite user
              </div>{" "}
            </button>{" "} */}
          </div>

          <div className="board" style={{ fontSize: "25px" }}>
            <ListGroup
              show={isOpenCreatColumn}
              setShow={setIsOpenCreatColumn}
              handle={handleCreatNewColumn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
