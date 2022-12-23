import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FcPlus } from "react-icons/fc";
import "./Details.scss";
import { useState } from "react";
import Example from "./createProject";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import UpdateProject from "./updateProject";
import DeleteProject from "./deleteProject";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../http-common";
import Column from "../../board/column"
import { renderWorkspace } from "../../util/apiService"
import Dropdown from 'react-bootstrap/Dropdown';
import ProjectList from "../detailsworkspace/projectList"
import { AiFillDelete } from "react-icons/ai";
import Sidebar from "../../backlog/sidebar";
import { FaBars } from "react-icons/fa";
import Nav from 'react-bootstrap/Nav';
import Language from "../../header/language"
import NavDropdown from "react-bootstrap/NavDropdown";
import { dologout } from "../../../redux/action/userAction"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useTranslation, Trans } from 'react-i18next';

const WorkspaceDetails = (props) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);
  const params = useParams();
  const location = useLocation();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false);
  const [showColumn, setShowColumn] = useState(false);
  const [dataColumn, setDataColumn] = useState('')

  const [ShowCreateCard, setShowCreateCard] = useState(false);
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
  const handleShowUpdateModal = (user) => {
    setShowUpdateModal(!showUpdateModal);
    setDataUpdate(user);
    console.log("user", user);
  };
  const handleShowDeleteModal = (user) => {
    setShowDeleteModal(!showDeleteModal);
    setDataDelete(user);
  };

  const handleShow = () => {
    setShow(!show);
  };
  const handleshowColumn = (project) => {
    setShowColumn(!showColumn);
    setDataColumn(project)
  };

  const handleShowCreateCard = () => {
    setShowCreateCard(!ShowCreateCard)
  };


  console.log(location?.state.LeadId)

  const workspaceId = params.id;
  const [project, setProject] = useState([]);
  const abc = async () => {
    let data = await renderWorkspace(workspaceId)
    if (data && data.data && data.data.success === 1) {
      setProject(data.data.data.projects);
    }
  };
  useEffect(() => {
    abc();
  }, [workspaceId]);

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
                      {t('Details.Fifth')}
                    </button>
                    <button className="btn-Signup" onClick={() => handleRegister()}>
                      {" "}
                      {t('Details.Second')}
                    </button>
                  </>
                ) : (
                  <NavDropdown
                    title={`hi , ${account.username}`}
                    id="basic-nav-dropdown"
                  >

                    <NavDropdown.Item onClick={() => handleLogout()}>
                      {t('Details.Third')}
                    </NavDropdown.Item>
                  </NavDropdown>

                )}
              <Language />

            </Nav></div>
          </div>
          <div className="detail-workspace_all ">
            <div className="Search">
              <nav className="navbar  ">
                <div className="container-fluid" >
                  <form className=" col-5" >
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
            </div>

            <div className="detail-workspace">

              <div className="detail-workspace_projects">
                <div className="all-project-title">
                  {t('Details.Fourth')}
                </div>
                <div className=" btn-creat-project">
                  <div className="icon" onClick={handleShow}><FcPlus /> </div>
                </div>

                <div className="all-project-list">
                  {project && project.length > 0 &&
                    project.filter((item) =>
                      item.name.includes(search) ||
                      item.type.includes(search)


                    ).map((item, index) => {
                      return (
                        <div className="project-details">
                          <div className="project-details-img">
                            <img src="https://miro.medium.com/max/1400/1*y6C4nSvy2Woe0m7bWEn4BA.png" alt="" />
                          </div>
                          <div className="project-details-title">
                            <div className="text" onClick={() =>
                              navigate(`project/${item._id}`, {
                                state: { nameWorkSpace: item.name },
                              })
                            }>{item.name}</div>
                            <div className="type-option">
                              <div className="type">type : {item.type}</div>
                              <div className="option">
                                <span style={{ color: "#3333CC" }} onClick={() => handleShowUpdateModal(item)}><AiFillEdit /></span>
                                <span style={{ color: "red" }} onClick={() => handleShowDeleteModal(item)}><AiFillDelete /></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }

                </div>


              </div>


            </div>


          </div>


        </div>
        <Example show={show} handleShow={handleShow} dataParam={abc} />
        <UpdateProject
          handleShowUpdateModal={handleShowUpdateModal}
          showUpdateModal={showUpdateModal}
          dataParam={abc}
          update={dataUpdate}
        />
        <DeleteProject
          showDeleteModal={showDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          abc={abc}
          dataDelete={dataDelete}
        />

      </div>
    </div>



  );
};

export default WorkspaceDetails;
