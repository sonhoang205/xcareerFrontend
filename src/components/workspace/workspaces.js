import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Delete from "../workspace/form-delete-workspace";
import { Link, useNavigate } from "react-router-dom";
import Example from "./form-creat-new-workspace";
import UpdateWorkspace from "../workspace/form-update-new-workspace";
import { useParams } from "react-router-dom";
import WorkspaceDetails from "../workspace/detailsworkspace/Details";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import http from "../../http-common";
const Workspace = (props) => {
  const navigate = useNavigate();
  // const [Workspace, setWorkspace] = useState([]);
  const [show, setShow] = useState(false);
  const [showModalUpdateWorkspace, setshowModalUpdateWorkspace] =
    useState(false);

  const [showModalDeleteWorkspace, setShowModalDeleteWorkspace] =
    useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  // const [viewWorkspace, setviewWorkspace] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdateWorkspace = (workspace) => {
    setshowModalUpdateWorkspace(!showModalUpdateWorkspace);
    setDataUpdate(workspace);
    // console.log(workspace);/
  };
  const handleDeleteWorkspace = (user) => {
    setShowModalDeleteWorkspace(!showModalDeleteWorkspace);
    setDataDelete(user);
  };
  // const viewWorkspaceDetails = (user) => {
  //   navigate(`/workspacedetails/${user._id}`);
  // };
  const [listWorkspace, setListWorkspace] = useState("");

  const fetchData = async () => {
    let res = await http.get("http://localhost:9090/api/workspace/");
    if (res && res.data && res.data.success === 1) {
      setListWorkspace(res.data);
      // console.log(listWorkspace);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container container-workspace">
      <h1
        style={{
          width: "18rem",
          marginLeft: "40px",
          marginTop: "30px",
          display: "flex",
          color: "red",
        }}
      >
        {" "}
        Workspace{" "}
      </h1>
      <div
        className="btn btn-success button"
        style={{
          marginLeft: "40px",
          marginTop: "30px",
        }}
        onClick={handleShow}
      >
        <AiOutlinePlusCircle /> create New WorkSpace
      </div>
      <div
        className="number"
        style={{ fontSize: "30px", color: "red", marginTop: "40PX" }}
      >
        {" "}
        Workspace: {listWorkspace?.data?.workspaces?.length}{" "}
      </div>
      <div className="row workspace">
        <div
          className="card-body"
          style={{
            width: "18rem",
            marginleft: "70px",
            marginTop: "100px",
            marginBottom: "10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "60px",
          }}
        >
          {listWorkspace?.data?.workspaces &&
            listWorkspace?.data?.workspaces?.length > 0 &&
            listWorkspace?.data?.workspaces.map((item, index) => {
              return (
                <>
                  <div>
                    <Card
                      style={{ width: "18rem" }}
                      key={index}
                      className="container-fluice"
                    >
                      <Card.Body>
                        <Card.Title>
                          {index + 1}-{item.name}
                        </Card.Title>
                        <Card.Text>id : {item._id}</Card.Text>

                        <Card.Text>Type : {item.type}</Card.Text>
                        <Card.Text>createdAt : {item.createdAt}</Card.Text>

                        <Button
                          variant="primary"
                          style={{ marginRight: "30px" }}
                          onClick={() =>
                            navigate(`workspacedetails/${item._id}`, {
                              state: { nameWorkSpace: item.name },
                            })
                          }
                        >
                          View details{" "}
                        </Button>
                        <Button
                          variant="primary"
                          style={{
                            marginRight: "20px",
                            color: "red",
                            fontSize: "20px",
                          }}
                          onClick={() => handleDeleteWorkspace(item)}
                        >
                          <MdDelete />{" "}
                        </Button>
                        <Button
                          variant="primary"
                          style={{ color: "red", fontSize: "20px" }}
                          onClick={() => handleUpdateWorkspace(item)}
                        >
                          <AiFillEdit />{" "}
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <Example
        view={show}
        setview={setShow}
        handleShowView={handleShow}
        handleCloseView={handleClose}
        fetchData={fetchData}
      />
      <UpdateWorkspace
        HandleShowUpdate={showModalUpdateWorkspace}
        setHandleShowUpdate={handleUpdateWorkspace}
        Update={dataUpdate}
        fetchData={fetchData}
      />
      <Delete
        HandleShowDelete={showModalDeleteWorkspace}
        setHandleShowDelete={handleDeleteWorkspace}
        dataDelete={dataDelete}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Workspace;
