import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

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
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
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
            <DiReact size={"3em"} color={"00bfff"} />
            Dự án abc
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaGem />}>
              {" "}
              {/* {intl.formatMessage({ id: "components" })} */}
              <Link to="/">Homepage</Link>{" "}
            </MenuItem>
            <MenuItem
              icon={<MdOutlinePermDataSetting />}
              suffix={<span className="badge red"></span>}
            >
              {/* {intl.formatMessage({ id: "dashboard" })} */}
              <Link to="">Board</Link>{" "}
            </MenuItem>
            <MenuItem icon={<FiSettings />}>
              {" "}
              {/* {intl.formatMessage({ id: "components" })} */}
              {/* <Link to="/Backlog">Backlog</Link>{" "} */}
            </MenuItem>

            <hr />
            <MenuItem icon={<FaGem />}>
              {" "}
              {/* {intl.formatMessage({ id: "components" })} */}
              components
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            {/* <SubMenu
              suffix={<span className="badge yellow">3</span>}
              //   title={intl.formatMessage({ id: "withSuffix" })}
              icon={<FaRegLaughWink />}
            >
              <MenuItem> 1</MenuItem>
              <MenuItem> 2</MenuItem>
              <MenuItem> 3</MenuItem>
            </SubMenu> */}
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="http://localhost:3000/"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              ></span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
