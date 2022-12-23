import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  AiFillSetting,
  FaGem,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdOutlinePermDataSetting } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import { dologout } from "../../redux/action/userAction"
import { useDispatch } from "react-redux";

import sidebarBg from "../../assets/bg2.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const [search, setSearch] = useState('')
  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState();
  const [show, setShow] = useState(false);

  const handleShowProfile = (username) => {
    setShow(!show);
    setProfile(account);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(dologout())
    navigate("/");


  }
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="xl"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>


          <div
            style={{
              padding: "20px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 15,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              marginLeft: "10px"
            }}
          >



            <DiReact size={"3em"} color={"00bfff"} />
            <div style={{ marginLeft: "10px" }}></div>Menu



          </div>
        </SidebarHeader>

        <SidebarContent>

          <Menu iconShape="circle">
            <MenuItem icon={<FaGem />}>
              <Link to="/">Homepage</Link>{" "}
            </MenuItem>
            <MenuItem
              icon={<MdOutlinePermDataSetting />}
              suffix={<span className="badge red"></span>}
            >
              <Link to="/Workspace">Workspace</Link>{" "}
            </MenuItem>


            <MenuItem icon={<FaGem />}>
              <Link to="/listuser">List user</Link>{" "}
            </MenuItem>
            <MenuItem icon={<FaGem />}>
              <Link to="/DashBoard">DashBoard</Link>{" "}
            </MenuItem>
          </Menu>
          {/* <Menu iconShape="circle">
            <SubMenu
              title={"hello"}
              suffix={<span className="badge yellow">aaa3</span>}
              icon={<FaRegLaughWink />}
            >
              <MenuItem> 1</MenuItem>
              <MenuItem> 2</MenuItem>
              <MenuItem> 3</MenuItem>
            </SubMenu>
          </Menu> */}
        </SidebarContent>


      </ProSidebar>
    </>
  );
};

export default Sidebar;
