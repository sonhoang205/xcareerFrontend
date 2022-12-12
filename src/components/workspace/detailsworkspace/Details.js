import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./Details.scss";
import { useState } from "react";
import Example from "./create-project";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import UpdateProject from "../detailsworkspace/update-project";
import DeleteProject from "../detailsworkspace/delete-project";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../http-common";

const WorkspaceDetails = (props) => {
  const navigate = useNavigate();

  const params = useParams();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

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
  const workspaceId = params.id;
  // console.log(workspaceId);
  const [project, setProject] = useState([]);
  const abc = async () => {
    let data = await http.get(
      `http://localhost:9090/api/project?workspaceId=${workspaceId}`
    );
    if (data && data.data && data.data.success === 1) {
      setProject(data.data);
    }
  };
  useEffect(() => {
    abc();
  }, [workspaceId]);

  return (
    <div className="detail-workspace container">
      <div className="header">
        <div className="heade-up">
          <h1>workspace Name : {location?.state.nameWorkSpace}</h1>
          <h2> Your work</h2>
          <button className="btn btn-success" onClick={handleShow}>
            <AiOutlinePlusCircle /> create New Project
          </button>
        </div>
        <div className="heade-down mt-5">
          {project?.data?.projects &&
            project?.data?.projects?.length > 0 &&
            project?.data?.projects.map((item, index) => {
              return (
                <div
                className="card text-white bg-info mb-3"
                  style={{ maxWidth: "30rem" }}
                  key={index}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    className="card-header"
                  // onClick={() =>
                  //   navigate(`Board/${item._id}`, {
                  //     state: { nameWorkProject: item.name },
                  //   })
                  // }
                  >
                    {" "}
                    <span
                      style={{
                        marginLeft: "20px",
                        fontSize: "25px",
                        overFlow: "auto",
                      }}
                    >
                      {index + 1}-{" "}
                      <span
                        onClick={() =>
                          navigate(`project/${item._id}`, {
                            state: { nameWorkProject: item.name },
                          })
                        }
                      >
                        {item.name}{" "}
                      </span>
                    </span>
                    <span
                      onClick={() => handleShowUpdateModal(item)}
                      style={{
                        marginLeft: "80px",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <AiFillEdit />{" "}
                    </span>{" "}
                    <span
                      style={{
                        marginLeft: "20px",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleShowDeleteModal(item)}
                    >
                      <RiDeleteBack2Fill />
                    </span>
                  </div>
                  <div className="card-body">
                    <p className="card-title"> type : {item.type}</p>
                    <p className="card-title"> Lead : {item.lead}</p>

                    <p className="card-title">id : {item._id}</p>

                  
                  </div>
                </div>
              );
            })}
        </div>{" "}
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
