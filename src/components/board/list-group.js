import "./list-group.scss";
import { useState, useEffect, useRef } from "react";
import { isEmpty } from "lodash";
import { InitialData } from "../action/action";
import Column from "./column";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "../util/state-drog-drag";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import CreatMem from "../board/mem/creatmem"
import http from "../../http-common";
import { listUser } from "../util/apiService"
import { renderAllMemInProject } from "../util/apiService"
const ListGroup = (props) => {
  const { search, setSearch } = props
  const params = useParams();
  const location = useLocation();
  const projectId = params.id;
  const [showCreateMem, setShowCreateMem] = useState(false);
  const [show, setShow] = useState(false);

  const [user, setUser] = useState();

  const handleShowCreateMem = () => setShowCreateMem(!showCreateMem);
  const handleShow = () => setShow(!show);

  console.log("projectId", projectId)
  const abc = async () => {
    let data = await renderAllMemInProject(projectId)
    if (data && data.data && data.data.success === 1) {
      setUser(data.data.data)

    }
  };
  useEffect(() => {
    abc();
  }, [projectId]);





  return (
    <>

      <div className="project-body">
        <button type="button" className="btn btn-success button  " onClick={handleShow}>
          <div >
            <AiOutlinePlusCircle /> create Task
          </div>
        </button>{" "}

        <div className="member">
          <span className="icon" onClick={handleShowCreateMem} style={{ cursor: "pointer" }}><RiUserAddLine /></span>
          <div className="member-info">
            <div className="member-list-name">
              {user && user.length > 0 &&
                user.map((item, index) => {
                  return (

                    <div className="member-name"  >{item.username[0]}{item.username[item.username.length - 1]}</div>

                  )
                })}
            </div>

          </div>

        </div>
      </div>
      <div className="board-content">

        <Column projectId={projectId} handleShow={handleShow} show={show} search={search} />


      </div>
      <CreatMem show={showCreateMem} handleShow={handleShowCreateMem} projectId={projectId} abc={abc} user={user} />
    </>






  );
};

export default ListGroup;
