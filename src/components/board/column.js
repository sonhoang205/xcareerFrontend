import "./column.scss";
import { Container, Draggable } from "react-smooth-dnd";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import http from "../../http-common";
import DropdownButton from "react-bootstrap/Dropdown";
import { GiWalk } from "react-icons/gi";
import { RiEdit2Fill } from "react-icons/ri";
import { BsFillPencilFill } from "react-icons/bs";
import { BiRun } from "react-icons/bs";
import { MdDoneAll } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { BsFillCircleFill } from "react-icons/bs";

import { TiDeleteOutline } from "react-icons/ti";
import Example from "../board/from-create-card";
import UpdateCard from "./from-update-card "
import DeleteCard from "./from-delete-card"
const Column = (props) => {
  const params = useParams();
  const location = useLocation();
  const { projectId } = props
  const [todoColum, setTodocolum] = useState([])
  const [inProgressColumn, setInProgress] = useState([])
  const [doneColumn, setDoneColumn] = useState([])
  const [cancelColumn, setCancelColumn] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [dataUpdate, setDataUpdate] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [datadelete, setDataDelete] = useState("")




  const { show, handleShow } = props


  const handleShowUpdateModal = (user) => {
    setShowUpdateModal(!showUpdateModal);
    setDataUpdate(user);
  };

  const handleShowDeleteModal = (user) => {
    setShowDeleteModal(!showDeleteModal);
    setDataDelete(user);
  };

  const todo = async () => {
    const status = "To Do"
    let data = await http.get(
      `//localhost:9090/api/task?status=${status}&projectId=${projectId}`
    );
    if (data && data.data && data.data.success === 1) {
      setTodocolum(data.data.data.tasks)
    }
  };

  const inProgress = async () => {
    const status = "In Progress"
    let data = await http.get(
      `//localhost:9090/api/task?status=${status}&projectId=${projectId}`
    );
    if (data && data.data && data.data.success === 1) {
      setInProgress(data.data.data.tasks)
    }
  };

  const Done = async () => {
    const status = "Done"

    let data = await http.get(
      `//localhost:9090/api/task?status=${status}&projectId=${projectId}`
    );
    if (data && data.data && data.data.success === 1) {
      setDoneColumn(data.data.data.tasks)
    }
  };



  const Cancel = async () => {

    let data = await http.get(
      `//localhost:9090/api/task?status=Cancel&projectId=${projectId}`
    );
    if (data && data.data && data.data.success === 1) {
      setCancelColumn(data.data.data.tasks)
    }
    console.log("cancelColumn", cancelColumn)
  };


  useEffect(() => {
    todo();
    inProgress();
    Done();
    Cancel();

  }, [projectId]);



  return (
    <>

      <div className="column" >
        <div className="column-drag-handle" style={{ backgroundColor: "#CC33FF" }}>

          <div className="title-header"><span style={{ color: "#00EE00", marginRight: "20px" }}><BsFillPencilFill /></span> To Do </div>

        </div>



        {todoColum && todoColum.length > 0 &&
          todoColum.map((item, index) => {
            return (
              <>
                <ul className="card-list" key={index} style={{ backgroundColor: "#CC33FF" }}>

                  <li>
                    <div className="card-item_header">

                      <p>
                        <div style={{ color: "yellow", fontSize: "15px", marginBottom: "10px" }}> <BsFillCircleFill /></div>

                        {item.title}
                      </p>
                      <span>
                        <span onClick={() => handleShowUpdateModal(item)}><RiEdit2Fill /></span>
                        <span onClick={() => handleShowDeleteModal(item)}
                        > <TiDeleteOutline /> </span> </span>
                    </div>
                  </li>
                </ul>

              </>

            )
          })}






      </div >


      {/* /// */}
      < div className="column" >
        <div className="column-drag-handle" style={{ backgroundColor: "palegoldenrod" }}>

          <div className="title-header"> <span style={{ color: "#C71585", marginRight: "20px", fontSize: "35px" }}><GiWalk /></span>In Progress </div>

        </div>
        {
          inProgressColumn && inProgressColumn.length > 0 &&
          inProgressColumn.map((item, index) => {
            return (
              <>

                <ul className="card-list" key={index} style={{ backgroundColor: "palegoldenrod" }}>

                  <li>
                    <div className="card-item_header">
                      <p>
                        <div style={{ color: "green", fontSize: "15px", marginBottom: "10px" }}> <BsFillCircleFill /></div>

                        {item.title}</p>
                      <span>
                        <span onClick={() => handleShowUpdateModal(item)}><RiEdit2Fill /></span>
                        <span onClick={() => handleShowDeleteModal(item)}
                        > <TiDeleteOutline /> </span> </span>
                    </div>
                  </li>
                </ul>
              </>

            )
          })
        }





      </div >
      {/* /// */}
      < div className="column" >
        <div className="column-drag-handle" style={{ backgroundColor: "olive" }}>

          <div className="title-header"><span style={{ color: "	#FF4500", marginRight: "20px", fontSize: "35px" }}><MdDoneAll /></span> Done</div>

        </div>
        {
          doneColumn && doneColumn.length > 0 &&
          doneColumn.map((item, index) => {
            return (
              <>
                <ul className="card-list" key={index} style={{ backgroundColor: "olive" }}>

                  <li>
                    <div className="card-item_header">
                      <p>
                        <div style={{ color: "blue", fontSize: "15px", marginBottom: "10px" }}> <BsFillCircleFill /></div>

                        {item.title}
                      </p>
                      <span>
                        <span onClick={() => handleShowUpdateModal(item)}><RiEdit2Fill /></span>
                        <span onClick={() => handleShowDeleteModal(item)}
                        > <TiDeleteOutline /> </span> </span>

                    </div>
                  </li>
                </ul>
              </>

            )
          })
        }



      </div >
      {/* ///// */}
      < div className="column" >
        <div className="column-drag-handle" style={{ backgroundColor: "palevioletred" }}>

          <div className="title-header"><span style={{ color: "		#8B0000", marginRight: "20px", fontSize: "35px" }}><ImCancelCircle /></span> Cancel</div>

        </div>
        {
          cancelColumn && cancelColumn.length > 0 &&
          cancelColumn.map((item, index) => {
            return (
              <>
                <ul className="card-list" key={index} style={{ backgroundColor: "palevioletred" }}>

                  <li>
                    <div className="card-item_header">
                      <p>
                        <div style={{ color: "red", fontSize: "15px", marginBottom: "10px" }}> <BsFillCircleFill /></div>

                        {item.title}
                      </p>
                      <span>
                        <span onClick={() => handleShowUpdateModal(item)}><RiEdit2Fill /></span>
                        <span onClick={() => handleShowDeleteModal(item)}
                        > <TiDeleteOutline /> </span>

                      </span>

                    </div>
                  </li>
                </ul>
              </>

            )
          })
        }

        {/* < footer >
          {" "}
          <button className="btn btn-success " style={{
            marginRight: "10px",
            marginLeft: "25px",
            fontSize: "20px",
            color: "white",
          }} onClick={handleShow}>
            <AiOutlinePlusCircle />

            Add new card

          </button>

        </footer> */}


      </div >
      <Example show={show} handleShow={handleShow} projectId={projectId} todo={todo} inProgress={inProgress} Done={Done} Cancel={Cancel} />
      <UpdateCard show={showUpdateModal} handleShow={handleShowUpdateModal} projectId={projectId} todo={todo} inProgress={inProgress} Done={Done} Cancel={Cancel} dataUpdate={dataUpdate} />
      <DeleteCard show={showDeleteModal} handleShow={handleShowDeleteModal} projectId={projectId} todo={todo} inProgress={inProgress} Done={Done} Cancel={Cancel} datadelete={datadelete} />
    </>
  );
};

export default Column;