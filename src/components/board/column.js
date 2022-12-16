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
import ShowDeatailTask from "../board/from-show-deatail-modal-task"
import { TiDeleteOutline } from "react-icons/ti";
import Example from "../board/from-create-card";
import UpdateCard from "./from-update-card "
import DeleteCard from "./from-delete-card"
import { status } from "nprogress";
import { FaUser } from "react-icons/fa";
import { BsFillFlagFill } from "react-icons/bs";

import _ from "lodash";

const Column = (props) => {
  const params = useParams();
  const location = useLocation();
  const { search} = props
  const [todoColum, setTodocolum] = useState([])
  const [inProgressColumn, setInProgress] = useState([])
  const [doneColumn, setDoneColumn] = useState([])
  const [cancelColumn, setCancelColumn] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [dataUpdate, setDataUpdate] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [datadelete, setDataDelete] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [status, setstatus] = useState("To Do");
  const [title, setTitle] = useState("");
  const [dataFlag, setDataFlag] = useState("")

  const [ShowFlag, setShowFlag] = useState(false)
  const [ShowFlagIP, setShowFlagIP] = useState(false)

  const [ShowFlagC, setShowFlagC] = useState(false)
  // const [dataShowDeatail, setDataShowDeatail] = useState("")




  const {  member ,dataColumn ,show ,handleshow} = props
const projectId =dataColumn._id


  const ShowFlagInProgress = () => {
    setShowFlagIP(!ShowFlagIP);
  };
  const ShowFlagDone = () => {
    setShowFlagC(!ShowFlagC);
  };






  const ShowDeatailmodalTask = (user) => {
    setShowDetailModal(!showDetailModal);
    setDataUpdate(user);
  };


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
      `//localhost:9090/api/task?status=To Do&projectId=${projectId}`
    );
    if (data && data.data && data.data.success === 1) {
      console.log("datatodo",todoColum)

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
  };




// const seclectAllText = (e)=>{
//     e.target.focus()
//     e.target.select()
// }
// console.log(dataUpdate)
  useEffect(() => {
    todo();
    inProgress();
    Done();
    Cancel();

  }, [dataColumn]);



  return (
    <>



    

      <div className="column" >
    



        <div className="column-drag-handle" style={{ backgroundColor: "#F5F5F5" }}>

          <div className="title-header"><span style={{ color: "#00EE00", marginRight: "20px" }}><BsFillPencilFill /></span> To Do </div>

        </div>



        {todoColum && todoColum.length > 0 &&
          todoColum.filter((Column)=>
          Column.title.includes(search) || 
          Column.status.includes(search) 

    
          ).map((item, index) => {
            console.log("item",item)
            return (
              <>
                <ul className="card-list" key={index} style={{ backgroundColor: "#F5F5F5" }}>

                  <li>
                    <div className="card-item_header"  >
                      <div className="title">
                        <div
                      
                          type="text"
                          className="form-control edit-title"
                          //  onChange={(event) => setTitle(event.target.value)}
                          //  onBlur={(event) => setTaskTitle(event.target.value)}
                          onClick={() => ShowDeatailmodalTask(item)} >            {item.title}
                          </div>
                        <span className="icon"> <Dropdown>
                       < Dropdown.Toggle  id="dropdown-basic" size="sm" className="icon-dropdown"/>
                      
                       <Dropdown.Menu>

                       <Dropdown.Item  onClick={() => handleShowDeleteModal(item)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown></span> 

                        </div>
                      
                      <div className="status">
                      <div className="dropDown" onClick={() => handleShowUpdateModal(item)}>
                       To Do

                       
                      </div>
                     

                       <span className="user"><FaUser/></span> 
                      </div>
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

          <div className="title-header"> <span style={{ color: "#C71585", marginRight: "15px", fontSize: "35px" }}><GiWalk /></span>In Progress </div>

        </div>
        {
          inProgressColumn && inProgressColumn.length > 0 &&
          inProgressColumn.filter((Column)=>
          Column.title.includes(search) || 
          Column.status.includes(search) ||
          Column.assignee.includes(search) 


    
          ).map((item, index) => {
            return (
              <>

                <ul className="card-list" key={index} style={{ backgroundColor: "palegoldenrod" }}>

                  <li>
                  <div className="card-item_header"  >
                      <div className="title">
                        <div
                      
                          type="text"
                          className="form-control edit-title"
                          //  onChange={(event) => setTitle(event.target.value)}
                          //  onBlur={(event) => setTaskTitle(event.target.value)}
                          onClick={() => ShowDeatailmodalTask(item)} >            {item.title}
                          </div>
                        <span className="icon"> <Dropdown>
                       < Dropdown.Toggle  id="dropdown-basic" size="sm" className="icon-dropdown"/>
                      
                       <Dropdown.Menu>

                       <Dropdown.Item  onClick={() => handleShowDeleteModal(item)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown></span> 

                        </div>
                     
                      
                      <div className="status">
                      <div className="dropDown" onClick={() => handleShowUpdateModal(item)}>
                       In Progress

                       
                      </div>
                     

                       <span className="user"><FaUser/></span> 
                      </div>
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

          <div className="title-header"><span style={{ color: "	#FF4500", marginRight: "15px", fontSize: "35px" }}><MdDoneAll /></span> Done</div>

        </div>
        {
          doneColumn && doneColumn.length > 0 &&
          doneColumn.filter((Column)=>
          Column.title.includes(search) || 
          Column.status.includes(search) ||
          Column.assignee.includes(search) 


    
          ).map((item, index) => {
            return (
              <>
                <ul className="card-list" key={index} style={{ backgroundColor: "olive" }}>

                  <li>
                  <div className="card-item_header"  >
                      <div className="title">
                        <div
                      
                          type="text"
                          className="form-control edit-title"
                          //  onChange={(event) => setTitle(event.target.value)}
                          //  onBlur={(event) => setTaskTitle(event.target.value)}
                          onClick={() => ShowDeatailmodalTask(item)} >            {item.title}
                          </div>
                        <span className="icon"> <Dropdown>
                       < Dropdown.Toggle  id="dropdown-basic" size="sm" className="icon-dropdown"/>
                      
                       <Dropdown.Menu>

                       <Dropdown.Item  onClick={() => handleShowDeleteModal(item)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown></span> 

                        </div>
                      
                      <div className="status">
                      <div className="dropDown" onClick={() => handleShowUpdateModal(item)}>
                      Done
                       
                      </div>
                     

                       <span className="user"><FaUser/></span> 
                      </div>
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
          cancelColumn.filter((Column)=>
          Column.title.includes(search) || 
          Column.status.includes(search) ||
          Column.assignee.includes(search) 


    
          ).map((item, index) => {
            return (
              <>
                <ul className="card-list" key={index} style={{ backgroundColor: "palevioletred" }}>

                  <li>
                  <div className="card-item_header"  >
                      <div className="title">
                        <div
                      
                          type="text"
                          className="form-control edit-title"
                       
                          onClick={() => ShowDeatailmodalTask(item)} >            {item.title}
                          </div>
                        <span className="icon"> <Dropdown>
                       < Dropdown.Toggle  id="dropdown-basic" size="sm" className="icon-dropdown"/>
                      
                       <Dropdown.Menu>

                       <Dropdown.Item  onClick={() => handleShowDeleteModal(item)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown></span> 

                        </div>
                      
                      <div className="status">
                      <div className="dropDown" onClick={() => handleShowUpdateModal(item)}>
                       Cancel
                       
                      </div>
                     

                       <span className="user"><FaUser/></span> 
                      </div>
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
      <Example show={show} handleshow={handleshow} projectId={projectId} todo={todo} inProgress={inProgress} Done={Done} Cancel={Cancel} member={member}/>
      <UpdateCard show={showUpdateModal} handleShow={handleShowUpdateModal} projectId={projectId} todo={todo} inProgress={inProgress} Done={Done} Cancel={Cancel} dataUpdate={dataUpdate} />
      <DeleteCard show={showDeleteModal} handleShow={handleShowDeleteModal} projectId={projectId} todo={todo} inProgress={inProgress} Done={Done} Cancel={Cancel} datadelete={datadelete} />
      <ShowDeatailTask show={showDetailModal} handleShow={setShowDetailModal} projectId={projectId} todo={todo} inProgress={inProgress} Done={Done} Cancel={Cancel} dataUpdate={dataUpdate} member={member}/>
    </>
  );
};

export default Column;