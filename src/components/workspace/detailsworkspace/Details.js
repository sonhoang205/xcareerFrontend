import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FcPlus } from "react-icons/fc";
import "./Details.scss";
import { useState } from "react";
import Example from "./create-project";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import UpdateProject from "../detailsworkspace/update-project";
import DeleteProject from "../detailsworkspace/delete-project";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../http-common";
import Column from "../../board/column"
import {renderWorkspace} from "../../util/apiService"
import Dropdown from 'react-bootstrap/Dropdown';
import ProjectList from "../detailsworkspace/project-list"
import { AiFillDelete } from "react-icons/ai";

const WorkspaceDetails = (props) => {
  const navigate = useNavigate();

  const params = useParams();
  const location = useLocation();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [search ,setSearch]= useState('')
  const [show, setShow] = useState(false);
  const [showColumn, setShowColumn] = useState(false);
  const [dataColumn ,setDataColumn]= useState('')

  const [ShowCreateCard, setShowCreateCard] = useState(false);

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




  const workspaceId = params.id;
  // console.log(workspaceId);
  const [project, setProject] = useState([]);
  const abc = async () => {
    let data = await renderWorkspace(workspaceId)
    if (data && data.data && data.data.success === 1) {
      setProject(data.data.data.projects);
      console.log("project",project)
    }
  };
  useEffect(() => {
    abc();
  }, [workspaceId]);

  return (
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
            onChange={(event)=>setSearch(event.target.value)}
            />
   
           </form>
           </div>
            </nav >
         </div>

      <div className="detail-workspace">
       
      <div className="detail-workspace_projects">
    <div className="all-project-title"> Project List</div>
        <div className=" btn-creat-project"> 
    <div className="icon" onClick={handleShow}><FcPlus/> </div>
   </div>
     {project && project.length>0 && 
        project.map((item ,index)=>{
  return(
    <>
    
   <div className="all-project-body"> 
      <div className="all-project-body_img">
        <img src="https://miro.medium.com/max/1400/1*y6C4nSvy2Woe0m7bWEn4BA.png" alt="" />
      </div>
      <div className="all-project-body">
      <div className="text" onClick={() => handleshowColumn(item)}>
        {item.name}
      </div>
      <div className="type-option">
        <div className="type"> type :   {item.type}</div>
        <div className="option"> 
       <span style={{color :"#3333CC"}} onClick={() => handleShowUpdateModal(item)}><AiFillEdit/></span>
       <span style={{color :"red"}} onClick={() => handleShowDeleteModal(item)}><AiFillDelete/></span>

        </div>

      </div>
    
      </div>
      </div>

    </>
   
  )
       })
       }       

   




</div>     
        <div className="detail-workspace_project">

            {showColumn ==true &&
            <>
        <div className="create-new-card">
           <button type="button" className="btn btn-success " onClick={() => handleShowCreateCard()}>
          <AiOutlinePlusCircle />  create New card
         </button>{" "}
      
          
        </div>
         <div className="total-column">
          <Column dataColumn={dataColumn} handleshow={handleShowCreateCard} show={ShowCreateCard} search={search}/>

         </div>
         </>
}
         
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
  );
};

export default WorkspaceDetails;
