


import "./Details.scss";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { FcPlus } from "react-icons/fc";

import { AiFillEdit } from "react-icons/ai";

const ProjectList = (props) => {
    const { project, handleShow, handleShowUpdateModal,handleShowDeleteModal } =
    props;
    const [show, setShow] = useState(false);


      return(
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
      <div className="text">
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
      )
}

export default ProjectList;
