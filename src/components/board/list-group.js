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
import { ImUserPlus } from "react-icons/im";

import http from "../../http-common";

const ListGroup = (props) => {

  const params = useParams();
  const location = useLocation();
  const projectId = params.id;
  const [show, setShow] = useState(false);
  const [member, setMember] = useState();

  const handleShow = () => setShow(!show);



  const abc = async () => {
    let data = await http.get(
      `http://localhost:9090/api/member/${projectId}`
    );
    if (data && data.data && data.data.success === 1) {
      console.log("data",member)
      setMember(data.data.data)
    }
  };
  useEffect(() => {
    abc();
  }, [projectId]);




  return (
    <>
      
    {/* ///////// */}
      <button type="button" className="btn btn-success button  " onClick={handleShow}>
        <div >
          <AiOutlinePlusCircle /> create New card
        </div>
      </button>{" "}
  

      <div className="board-content">

        <Column projectId={projectId} handleShow={handleShow} show={show} member={member} />


      </div>

    </>






  );
};

export default ListGroup;
