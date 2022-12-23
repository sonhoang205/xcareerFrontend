import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom";
import { TbAlignJustified } from "react-icons/tb";
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import Sidebar from "../backlog/sidebar";
import { useTranslation, Trans } from 'react-i18next';

import "./workspacesTabs.scss";
import { renderAllWorkSpace } from "../util/apiService";
import Example from "./form-creat-new-workspace";
import UpdateWorkspace from "../workspace/form-update-new-workspace";
import WorkspaceDetails from "../workspace/detailsworkspace/Details";
import Delete from "../workspace/form-delete-workspace";
import { dataAssign } from "../util/apiService"
import { assign } from "lodash";
import { FaBars } from "react-icons/fa";
import Language from "../header/language"
import NavDropdown from "react-bootstrap/NavDropdown";
import { dologout } from "../../redux/action/userAction"
import { useDispatch } from "react-redux";

const Workspaces = (props) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);
  const [listWorkspace, setListWorkspace] = useState("");
  const [listWorkspaceAsign, setListWorkspaceAsign] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [viewDetailsAssignData, setViewDetailsAssignData] = useState("");
  const [showviewDetailsAssign, setShowviewDetailsAssign] = useState(false);
  const [profile, setProfile] = useState();

  const [status, setStatus] = useState(false);

  const handleShow = () => setShow(!show);

  const handleViewWorkspaceAssign = (user) => {
    setShowviewDetailsAssign(!showviewDetailsAssign);
    setViewDetailsAssignData(user);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(dologout())
    navigate("/");


  }
  const handleLogin = () => {
    navigate("/Login");
  };

  const handleRegister = () => {
    navigate("/register");
  };
  const handleDeleteWorkspace = (user) => {
    setShowDelete(!showDelete);
    setDataDelete(user);
  };

  const handleChangeUpdateWorkspace = (user) => {
    setShowUpdate(!showUpdate);
    setDataUpdate(user);
    console.log(user)
  };
  const handleChangeWorkspace = (user) => {
    setStatus(false);

  };


  const handleChangeWorkspaceAsign = (user) => {
    setStatus(true);

  };


  const handleViewInfo = (user) => {
    setStatus(true);

  };
  const fetchData = async () => {
    let res = await renderAllWorkSpace();
    if (res && res.data && res.data.success === 1) {
      setListWorkspace(res.data.data.workspaces);
    }
  };
  useEffect(() => {
    fetchData();
  }, [status]);

  const fetchDataAsign = async () => {
    let resapi = await dataAssign(account.id);
    if (resapi && resapi.data && resapi.data.success === 1) {

      setListWorkspaceAsign(resapi.data.data);
      console.log("listWorkspaceAsign", listWorkspaceAsign)
    }
  };

  useEffect(() => {
    fetchDataAsign();
  }, [status]);


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
                      {t('workspaces.First.textOne')}
                    </button>
                    <button className="btn-Signup" onClick={() => handleRegister()}>
                      {" "}
                      {t('workspaces.First.textTwo')}
                    </button>
                  </>
                ) : (
                  <NavDropdown
                    title={`hi , ${account.username}`}
                    id="basic-nav-dropdown"
                  >

                    <NavDropdown.Item onClick={() => handleLogout()}>
                      {t('workspaces.second.textThree')}
                    </NavDropdown.Item>
                  </NavDropdown>

                )}
              <Language />

            </Nav></div>
          </div>
          {status === true ?
            <>
              <div className="workspace-nav">
                <div className="My-workspace" onClick={() => handleChangeWorkspace()}>
                  {t('workspaces.Third.textOne')}
                </div>
                <div className="assign-workspace" style={{ backgroundColor: "#00504B", color: "white" }} onClick={() => handleChangeWorkspaceAsign()}>
                  {t('workspaces.Third.textTwo')}
                </div>

              </div>

              <div className="workspace-body">
                {listWorkspaceAsign && listWorkspaceAsign.length > 0 &&
                  listWorkspaceAsign.map((item, index) => {
                    return (
                      <div className="workspace-body-card" style={{ marginTop: "20px" }}>
                        <div className="workspace-body-card_img" >
                          <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6i3yoMTGUYx6BKrTWp2J2BBe65oylLd5a-w&usqp=CAU" alt="" />
                        </div>
                        <div className="workspace-body-card_title"  >
                          <div className="text" onClick={() =>
                            navigate(`workspacedetails/${item.workspaceId}/project/${item._id}`, {
                              state: { nameWorkSpace: item.name },
                              state: { LeadId: item.lead },
                            })
                          }>{item.name}</div>
                          <div className="workspace-body-card_option" >
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic" className="dropdown-btn" />


                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleViewWorkspaceAssign(item)} >
                                  {t('workspaces.Fourth.textOne')}
                                </Dropdown.Item>
                                {/* <Dropdown.Item   onClick={() => handleDeleteWorkspace(item)}>Delete Workspace</Dropdown.Item> */}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>

                      </div>


                    )

                  })
                }

              </div>

              <Example
                view={show}
                handleShowView={handleShow}
                fetchData={fetchData}
              />
              <UpdateWorkspace
                showUpdate={showUpdate}
                handleChangeUpdateWorkspace={handleChangeUpdateWorkspace}
                dataUpdate={dataUpdate}
                fetchData={fetchData}
              />
              <Delete
                showDelete={showDelete}
                handleDeleteWorkspace={handleDeleteWorkspace}
                dataDelete={dataDelete}
                fetchData={fetchData}
              />
            </>
            :

            <>
              <div className="workspace-nav">
                <div className="My-workspace" style={{
                  backgroundColor: "#00504B", color: "white"
                }} onClick={() => handleChangeWorkspace()}>
                  {t('workspaces.Third.textOne')}
                </div>
                <div className="assign-workspace" onClick={() => handleChangeWorkspaceAsign()}>
                  {t('workspaces.Third.textTwo')}

                </div>

              </div>
              <div
                className="btn btn-success button"
                style={{
                  marginLeft: "40px",
                  marginTop: "30px",
                  marginBottom: "20px",
                  boxShadow: "20px 20px 50px rgb(102, 91, 91)"

                }}
                onClick={handleShow}
              >
                <AiOutlinePlusCircle />
                {t('workspaces.Fifth')}

              </div>

              <div className="workspace-body">
                {listWorkspace && listWorkspace.length > 0 &&
                  listWorkspace.map((item, index) => {
                    console.log(item.workspaceId)
                    return (
                      <div className="workspace-body-card" >
                        <div className="workspace-body-card_img" >
                          <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6i3yoMTGUYx6BKrTWp2J2BBe65oylLd5a-w&usqp=CAU" alt="" />
                        </div>
                        <div className="workspace-body-card_title"  >
                          <div className="text" onClick={() =>
                            navigate(`workspacedetails/${item._id}`, {
                              state: { nameWorkSpace: item.name, idWorkSpace: item._id },
                            })
                          }>{item.name}</div>
                          <div className="workspace-body-card_option" >
                            {/* <div className="icon"><TbAlignJustified/></div> */}
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic" className="dropdown-btn" />


                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleChangeUpdateWorkspace(item)} >
                                  {t('workspaces.Sixth.textOne')}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDeleteWorkspace(item)}>
                                  {t('workspaces.Sixth.textTwo')}
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>

                      </div>


                    )

                  })
                }

              </div>

              <Example
                view={show}
                handleShowView={handleShow}
                fetchData={fetchData}
              />
              <UpdateWorkspace
                showUpdate={showUpdate}
                handleChangeUpdateWorkspace={handleChangeUpdateWorkspace}
                dataUpdate={dataUpdate}
                fetchData={fetchData}
              />
              <Delete
                showDelete={showDelete}
                handleDeleteWorkspace={handleDeleteWorkspace}
                dataDelete={dataDelete}
                fetchData={fetchData}
              />
            </>
          }

        </div>

      </div>
    </div>

  );

};

export default Workspaces;
