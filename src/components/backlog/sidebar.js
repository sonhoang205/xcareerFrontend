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

import sidebarBg from "../../assets/bg2.jpg";

const Sidebar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const [search, setSearch] = useState('')

  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="xl"
        onToggle={handleToggleSidebar}
      >
        {/* <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {/* <DiReact size={"3em"} color={"00bfff"} />
            Dự án abc */}
        {/* </div> */}
        {/* </SidebarHeader> */}

        <SidebarContent>
          <nav className="navbar  ">
            <div className="container-fluid" >
              <form className=" col-12" >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />

              </form>
            </div>
          </nav >
          <Menu iconShape="circle">
            <MenuItem icon={<FaGem />}>
              <Link to="/">Homepage</Link>{" "}
            </MenuItem>
            <MenuItem
              icon={<MdOutlinePermDataSetting />}
              suffix={<span className="badge red"></span>}
            >
              <Link to="/Workspace">Workspace list</Link>{" "}
            </MenuItem>
            <MenuItem icon={<FiSettings />}>
              <Link to="/Workspace/workspacedetails/:id">project list</Link>{" "}

            </MenuItem>

            <hr />
            <MenuItem icon={<FaGem />}>
              components
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              title={"hello"}
              suffix={<span className="badge yellow">aaa3</span>}
              icon={<FaRegLaughWink />}
            >
              <MenuItem> 1</MenuItem>
              <MenuItem> 2</MenuItem>
              <MenuItem> 3</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>


      </ProSidebar>
    </>
  );
};

export default Sidebar;
