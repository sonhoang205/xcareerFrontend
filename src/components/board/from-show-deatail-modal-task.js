import "./from-show-deatail-modal-task.scss";
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import http from "../../http-common";
import { toast } from "react-toastify";
import _ from "lodash";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';

const ShowDeatailTask = (props) => {
    const { show, handleShow, projectId, dataUpdate, todo, inProgress, Done, Cancel ,member } = props;
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [status, setstatus] = useState("To Do");
    const [assignee, setAssignee] = useState();
    const [id, setId] = useState("");
    const [reporter, setReporter] = useState("");
    const [comment, setComment] = useState("");
    const [attach, setAttach] = useState("");
    const [image, setImage] = useState("");
    const [preImage, setPreImage] = useState("");

    const [imageState, setImageState] = useState(false);
    const [descriptionState, setDescriptionState] = useState(false);
    const [titleState, setTitleState] = useState(false);
    const [button, setButton] = useState(false);


    

    const islogin = useSelector((state) => state.user.islogin);
    const account = useSelector((state) => state.user.account);

    const comments = async () => {
        let data = await http.get(
          `http://localhost:9090/api/comment?taskId=${id}`
        );
        if (data && data.data && data.data.success === 1) {
            console.log(data.data.data.comments)
            setComment(data.data.data.comments)
    
    
        }
      };

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setTitle(dataUpdate.title);
            setdescription(dataUpdate.description);
            setstatus(dataUpdate.status);
            setAssignee(dataUpdate.assignee);
            setReporter(dataUpdate.reporter);
            setId(dataUpdate._id);
            // setImage(dataUpdate.img);


        }
    }, [dataUpdate]);

    useEffect(() => {
        comments()

    }, [id]);


    console.log("member",member)
    const handleUpdateCard = async () => {
        let dataupdate = {
            status: status,
            projectID: projectId,
            title: title,

        };
        console.log("id", id);

        let res = await http.put(
            `http://localhost:9090/api/task/${id}`,
            dataupdate
        );



        if (res && res.data.success === 1) {
            toast.success("update task success");
            setImageState(false)
            setDescriptionState(false)
            setTitleState(false)
            setButton(false)
            await todo();
            await inProgress();
            await Done();
            await Cancel();

        }

        if (res && res.data.success === 0) {
            toast.error(res.data.message);
            return;
        }
    };


    const handleUpdateImage = (event)=>{
            setPreImage(URL.createObjectURL(event.target.files[0]))  
            setImage(URL.createObjectURL(event.target.files[0]))
            console.log("update" , event.target.files[0])
        
       
    }
    const ChangeState =()=> {
        setImageState(!imageState)
        setButton(true)
    }
    const ChangeStateOne =()=> {
        setImageState(true)
        setButton(false)
    }
    const ChangeStateDescripton =()=> {
        setDescriptionState(true)
        setButton(true)

    }
    const ChangeStateDescriptonOne =()=> {
        setDescriptionState(true)
        setButton(false)

    }
    const ChangestateTitle =()=> {
        setTitleState(!titleState)
        setButton(!button)

    }
    const ChangestateAssgin =()=> {
        setButton(true)

    }

    console.log("id",id)
    return (
        <>
            <Modal show={show} onHide={handleShow} size="xl"
            >
               
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div> 
                            <div style={{marginBottom : "20px" , fontSize:"40px" , overflowWrap:"anywhere"}}>View Detail </div>
                            <div style={{maxWidth:"150px" , color:"grey"}} >
                            <select
                                // id="inputState"
                                className="form-select"
                                value= {status}
                                onChange={(event) => setstatus(event.target.value)}
                            >
                                <option>To Do</option>
                                <option>In Progress</option>
                                <option>Done</option>
                                <option>Cancel</option>

                               
                            </select>
                            </div>
                           </div> 
                           </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <div className="container-body">

                    <div className="body-left">
                        <div className="title"> 
                         <div className="title-header" onClick={ChangestateTitle} onBlur={ChangeStateOne}>Title :</div>
                         { titleState === true ?  <div className="col-md-12">
                         
                         <Form.Control

                            type="text"
                            id="inputEmail4"
                            as="textarea"
                            rows="2"
                            style={{marginTop: "20px", fontSize:"30px", borderRadius:"10px" , width:"50%"  ,backgroundColor:"white",border:"none"}}
                            placeholder="Add new description"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                       </div> : 
                         <Form.Control

                            type="text"
                            id="inputEmail4"
                            as="textarea"
                            rows="2"
                            className="title-body"
                            style={{marginTop: "20px", fontSize:"30px", borderRadius:"10px" , width:"50%"  ,backgroundColor:"white",border:"none"}}
                            placeholder="Add new description"
                            value={title}
                            disabled
                        />
                        }
  

                    
                         </div>
                        
                        <div className="Description">
                        <div className="description-header"  onClick={ChangeStateDescripton} onBlur={ChangeStateDescriptonOne}> Description: </div>
                        { descriptionState === true ?    
                        <div className="col-md-12">
                         
                          <Form.Control

                             type="text"
                             id="inputEmail4"
                             as="textarea"
                             rows="2"
                             style={{marginTop: "20px", fontSize:"30px", borderRadius:"10px" , width:"50%"  ,backgroundColor:"white",border:"none"}}
                             placeholder="Add new description"
                             value={description}
                             onChange={(event) => setdescription(event.target.value)}
                         />
                        </div> : 
                          <Form.Control

                             type="text"
                             id="inputEmail4"
                             as="textarea"
                             rows="2"
                             className="description-body"
                             style={{marginTop: "20px", fontSize:"30px", borderRadius:"10px" , width:"50%"  ,backgroundColor:"white",border:"none"}}
                             placeholder="Add new description"
                             value={description}
                             disabled
                         />
                         }

                     
                            {/*  */}
                      
                      
                     {/* /.////////////////////// */}
                        <div className="image">
                        <div className="image-header" onClick={ChangeState}> Image: </div>
                        {imageState === true ?  <div className="col-md-12 Uploade-img">
                            <label for="inputEmail4" className="form-label label-upload" htmlFor="label-up">
                               <AiOutlinePlusCircle/> Uploade image
                            </label>
                            <input
                                id="label-up"
                                type="file"
                                hidden
                                onChange={(event) => handleUpdateImage(event)}

                            />
                           <div className="col-md-12 img-previews">
                            {preImage ? <img src={preImage} 
                              /> :   <span>Image</span>
                             }
                          
                          </div>
                        </div> :  
                        <div className="image-body">     
                        <img src={image}  />
                         </div> }
                       

                      
                        </div>
                        </div>



                    </div>
                    <div className="body-right">
                   
                    <div className="assignee"  >
                        <div className="assignee-title" onClick={ChangestateAssgin}> Assignee</div>
                        <select
                                // id="inputState"
                                className="form-select"
                                value= {assignee}

                            >
                                {member && member.length > 0 &&
                                member.map((item , index)=>{
                                    return(
                                        
                                        <option>{item.userId}</option>

                                    )

                                })
                                }
                                
                      </select>

                            
                        </div>
                    
                            <div className="Reporter"  >
                           <div className="Reporter-title"> Reporter</div>
                        <select
                                // id="inputState"
                                className="form-select"
                                value= {reporter}
                            >
                                {member && member.length > 0 &&
                                member.map((item , index)=>{
                                    return(
                                        <option>{item.userId}</option>

                                    )

                                })
                                }
                                
                               
                            </select>
                            
                            </div>
                    

                    </div>

                   </div>
                     <Modal.Footer>
              {button ===true &&   
              <Button variant="primary" onClick={handleUpdateCard}>
                        Save
                    </Button>}
                  
                </Modal.Footer>
                </Modal.Body>
              
                <div className='chat'>
                  <div className="info-coversation">
                    <div className="coversation-left">

                        <div className="coversation-left_info">

                           <div className="coversation-left_user" >                         
                             huy lê
                          </div>
                          <div className="coversation-left_time" >time</div>

                        </div>
                        <div className="coversation-left_title" >nay code react js khó quá</div>
                        <div className="coversation-left_option"> 
                        <div className="edit"> edit</div>
                        <div className="delete"> delete</div>

                        </div>

                    </div>
                    <div className="coversation-right">
                    <div className="coversation-right_info">

                            <div className="coversation-left_user" >                         
                                        huy lê
                         </div>
                      <div className="coversation-righ_time" >time</div>

                    </div>
                    <div className="coversation-righ_title" >nay code react js khó quá</div>
                    <div className="coversation-righ_option"> 
                    <div className="edit"> edit</div>
                    <div className="delete"> delete</div>

</div>

</div>
                  </div>
                  <div className="input-coversation">
                   <input type="text" />
                   <button type="submit"> send</button>
                  </div>
                </div> 
                          </Modal>
        </>
    );
}


export default ShowDeatailTask