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
import { IoMdPersonAdd } from "react-icons/io";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import {dologout} from "../../redux/action/userAction"

const Board = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);
  const [isOpenCreatColumn, setIsOpenCreatColumn] = useState(false);
  const handleCreatNewColumn = () => {
    setIsOpenCreatColumn(!isOpenCreatColumn);
  };

  const handleLogout =()=>{
    // localStorage.removeItem('user');
    dispatch(dologout())
    navigate("/Login");

  
   }

   const handleLogIn =()=>{
    navigate("/Login");

  
   }

   const handleBackHomePage =()=>{
    // localStorage.removeItem('user');
    navigate(`/`);

  
   }


  return (
    <div className="project-container">
      <div className="info-container">
      <div className="button-back" onClick={()=>handleBackHomePage() 
}> Back to Workspace</div>

          <div className="acount-user"> 
             <div className="acount-img"> 
              <img src="https://www.pngitem.com/pimgs/m/80-800194_transparent-users-icon-png-flat-user-icon-png.png" alt="" />
             </div>  
             <div className="acount-name">
             {islogin === true ?  <NavDropdown
                title={`hi , ${account.username}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={()=>handleLogout()}>Log Out</NavDropdown.Item>
              </NavDropdown > : <h2 onClick={()=>handleLogIn()} style={{color:"#00637C" , cursor:"pointer"}} > Login</h2>}
             </div>    

           </div>   
           <hr />   
          <div className=" member-info">
           <div className="member-info-title">Member list</div>
           <div className="member-info-icon"> <IoMdPersonAdd/></div>
           </div>
           <div className="member-list">
            <div className="member-user">
              <div className="member-user_img">
                <img src="https://icon2.cleanpng.com/20180408/edw/kisspng-user-computer-icons-gravatar-blog-happy-woman-5aca6d038826d9.7357010215232156195577.jpg" alt="" />
              </div>
              <div className="member-user_name"> Hoang son</div>
            </div>
           </div>
{/* /////////////////////////////// */}
           <div className="member-list">
            <div className="member-user">
              <div className="member-user_img">
                <img src="https://icon2.cleanpng.com/20180408/edw/kisspng-user-computer-icons-gravatar-blog-happy-woman-5aca6d038826d9.7357010215232156195577.jpg" alt="" />
              </div>
              <div className="member-user_name">  dat duong</div>
            </div>
           </div>
           
        </div>




      <div className="admin-content">
       
        <div className="admin-main">
          <div className="title">
            <div className="name">
              {" "}
              Project : {location?.state.nameWorkProject}{" "}
            </div>
         
          
          </div>
          <Search />

         

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
