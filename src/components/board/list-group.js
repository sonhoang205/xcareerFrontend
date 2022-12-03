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

const ListGroup = (props) => {

  const params = useParams();
  const location = useLocation();
  const projectId = params.id;
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);



  return (
    <>
      <button type="button" className="btn btn-success button  " onClick={handleShow}>
        <div >
          <AiOutlinePlusCircle /> create New card
        </div>
      </button>{" "}

      <div className="board-content">

        <Column projectId={projectId} handleShow={handleShow} show={show} />


      </div>

    </>






  );
};

export default ListGroup;
