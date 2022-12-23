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
import ShowDetailMem from "../board/mem/showDetailMem"
const ListGroup = (props) => {
  const { search, setSearch, LeadId } = props
  const params = useParams();
  const location = useLocation();
  const projectId = params.id;
  const [showCreateMem, setShowCreateMem] = useState(false);
  const [show, setShow] = useState(false);

  const [user, setUser] = useState();
  const [showDeatailUser, setShowDeatailUser] = useState(false);
  const [dataUser, setDataUser] = useState("");
  const [data, setata] = useState("");
  const [member, setMember] = useState();



  const handleShowDeatailMem = (item) => {
    setDataUser(item)
    setShowDeatailUser(!showDeatailUser)
  }

  const handleShowCreateMem = () => setShowCreateMem(!showCreateMem);
  const handleShow = () => setShow(!show);

  const renderMember = async () => {
    let data = await renderAllMemInProject(projectId)
    if (data && data.data && data.data.success === 1) {
      setUser(data.data.data)
    }
  };
  useEffect(() => {
    renderMember();
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

                    <div className="member-name" onClick={() => handleShowDeatailMem(item)}  >{item.username[0]}{item.username[item.username.length - 1]}</div>


                  )
                })}
            </div>

          </div>

        </div>
      </div>
      <div className="board-content">

        <Column projectId={projectId} handleShow={handleShow} show={show} search={search} user={user} LeadId={LeadId} member={member} />


      </div>
      <CreatMem show={showCreateMem} handleShow={handleShowCreateMem} projectId={projectId} abc={renderMember} user={user} listUser={listUser} member={member} setMember={setMember} />
      <ShowDetailMem showDeatailUser={showDeatailUser} handleShowDeatailMem={handleShowDeatailMem} dataUser={dataUser} projectId={projectId} abc={renderMember} />
    </>






  );
};

export default ListGroup;
