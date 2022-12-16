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
import Form from 'react-bootstrap/Form';
import http from "../../http-common"
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import CreatMem from "../board/mem/creatmem"
import {dologout} from "../../redux/action/userAction"

const Board = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search ,setSearch]= useState('')
  const [member ,setMember]= useState('')
  const projectId = params.id
  const location = useLocation();
  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);
  const [isOpenCreatColumn, setIsOpenCreatColumn] = useState(false)
  const [showModalMem, setshowModalMem] = useState(false);
  ;
  const handleCreatNewColumn = () => {
    setIsOpenCreatColumn(!isOpenCreatColumn);
  };


  console.log("projectId",projectId)
  const handleShowCreatMem =()=>{
    setshowModalMem(!showModalMem)
  
   }
  const handleLogout =()=>{
    // localStorage.removeItem('user');
    dispatch(dologout())
    navigate("/Login");

  
   }

   const handleLogIn =()=>{
    navigate("/Login");

  
   }
   const mem = async () => {
    let data = await http.get(
      `http://localhost:9090/api/member/${projectId}`
    );
    if (data && data.data && data.data.success === 1) {
      console.log("member",member)
      setMember(data.data.data)
    }
  };
  useEffect(() => {
    mem();
  }, [projectId]);



  return (
      <div className="project-container">
          <div className="info-container">
     

          <div className="acount-project"> 
         
         <h2> {location?.state.nameWorkProject}{" "}  </h2> 


           </div>   
           <hr />   
           
          <div className=" member-info">
           <div className="member-info-title">Member list</div>
           <div className="member-info-icon" onClick={()=>handleShowCreatMem()}> <IoMdPersonAdd/></div>
           </div>
           <div className="member-list">
            <div className="member-user">
              <div className="member-user_img">
                <img src="https://icon2.cleanpng.com/20180408/edw/kisspng-user-computer-icons-gravatar-blog-happy-woman-5aca6d038826d9.7357010215232156195577.jpg" alt="" />
              </div>
              <div className="member-user_name"> Hoang son </div>
              <span className="member-user_icon"><MdOutlineCancelScheduleSend/></span>
            </div>
           </div>
{/* /////////////////////////////// */}
         <div className="member-list">
            <div className="member-user">
              <div className="member-user_img">
                <img src="https://icon2.cleanpng.com/20180408/edw/kisspng-user-computer-icons-gravatar-blog-happy-woman-5aca6d038826d9.7357010215232156195577.jpg" alt="" />
              </div>
              <div className="member-user_name"> Hoang son </div>
              <span className="member-user_icon"><MdOutlineCancelScheduleSend/></span>
            </div>
           </div>
           
        </div>




      <div className="admin-content">
       
        <div className="admin-main">
         
             <div className="acount-user"> 
              <div className="acount-img"> 
              <img src="https://i.pinimg.com/originals/07/a4/20/07a420f822e2d0624c76efba4fbb0b24.jpg" alt="" />
              </div>  
             <div className="acount-name">
              <h4></h4>
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
         
          
          {/* </div> */}
          {/* ///  Search*/}
     <div className="search">
          <nav className="navbar  ">
           <div className="container-fluid" >
           <form className=" col-8" >
          <Form.Control
            className="form-control me-5"
            type="search"
            placeholder="Search"
            aria-label="Search"
            as="textarea"
            rows="2"
            value={search}
            onChange={(event)=>setSearch(event.target.value)}
          />
         
        </form>
      </div>
     </nav >
    </div>
{/* //// */}
          <div className="board" style={{ fontSize: "25px" }}>
            <ListGroup
              show={isOpenCreatColumn}
              setShow={setIsOpenCreatColumn}
              handle={handleCreatNewColumn}
              search={search}
            />
          </div>
          <CreatMem show={showModalMem} handleShow={handleShowCreatMem} />

        </div>
      </div>
    </div>
  );
};

export default Board;
