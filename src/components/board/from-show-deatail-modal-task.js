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
import { IoIosSend } from "react-icons/io";
import { BsSortDownAlt } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { listUser } from "../util/apiService"

import axios from "axios";
import { useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { Award } from "react-bootstrap-icons";
const ShowDeatailTask = (props) => {
  const { show, handleShow, projectId, dataUpdate, todo, inProgress, Done, Cancel, user, dataMedia, setDataMedia, setTaskAfterUpdate, taskAfterUpdate } = props;
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
  const [inputComment, setInputComment] = useState("");
  const [member, setMember] = useState("");

  const [imageState, setImageState] = useState(false);
  const [descriptionState, setDescriptionState] = useState(false);
  const [titleState, setTitleState] = useState(false);
  const [button, setButton] = useState(false);
  const [sortInput, setSortInput] = useState(false);




  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);

  const comments = async () => {
    let data = await http.get(
      `https://xcareer1backend.onrender.com/api/comment?taskId=${id}`
    );
    if (data && data.data && data.data.success === 1) {
      setComment(data.data.data.comments)


    }
  };
  useEffect(() => {
    comments()
  }, [id]);

  const listmem = async () => {
    let data = await listUser()
    if (data && data.data && data.data.success === 1) {
      setMember(data.data.data)
    }
  };
  useEffect(() => {
    listmem()
  }, []);


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


  const handleChangSortInput = () => {
    setSortInput(!sortInput)
  }


  const handleUpdateCard = async () => {
    let dataupdate = {
      status: status,
      projectID: projectId,
      title: title,
      assignee: assignee,
      description: description

    };

    let res = await http.put(
      `https://xcareer1backend.onrender.com/api/task/updatetask/${id}`,
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


  const handleUpdateImage = (event) => {
    setImage(event.target.files[0])
    console.log("update", event.target.files[0].name)
    console.log("image", image)


  }
  const ChangeState = () => {
    setImageState(!imageState)
    setButton(true)
  }
  const ChangeStateOne = () => {
    setImageState(true)
    setButton(false)
  }
  const ChangeStateDescripton = () => {
    setDescriptionState(true)
    setButton(true)

  }
  const ChangeStateDescriptonOne = () => {
    setDescriptionState(true)
    setButton(false)

  }
  const ChangestateTitle = () => {
    setTitleState(!titleState)
    setButton(!button)

  }
  const ChangestateAssgin = () => {
    setButton(true)

  }


  const updateFile = async () => {
    const data = new FormData();
    data.append('file', image);



    let creatFile = await axios({
      method: 'post',
      url: 'https://xcareer1backend.onrender.com/api/upload/disk',
      data: data,
      headers: {
        'Content-Type': `multipart/form-data;`,
      },
    });

    if (creatFile && creatFile.data.success === 1) {

      console.log("creatFile", creatFile.data.data)

      toast.success("update file success");
      setDataMedia(creatFile.data.data)
      console.log("DataMedia", dataMedia)

      setImage("")
    }


  }
  const handleUpdateTaskAfterCreateImage = async () => {


    let res = await http.put(
      `https://xcareer1backend.onrender.com/api/task/updatefile?taskId=${dataUpdate._id}&fileName=${dataMedia}`
    );


    if (res && res.data.success === 1) {
      console.log("res", res.data.updateFileName)


      setTaskAfterUpdate(res.data.updateFileName)
      console.log("TaskAfterUpdate", taskAfterUpdate)
    }
  };

  const handleInputComment = async () => {
    let commentCreate = {
      content: inputComment,
      taskId: id,
      createdById: account.id
    };
    console.log("commentCreate", commentCreate);

    let res = await http.post(
      `https://xcareer1backend.onrender.com/api/comment/create`,
      commentCreate
    );
    if (res && res.data.success === 1) {
      setInputComment("")

      await comments();
    }



  };

  const handleDeleteComment = async (commentId) => {
    console.log("commentId", commentId)

    let res = await http.delete(
      `https://xcareer1backend.onrender.com/api/comment/${commentId}`,
    );
    if (res && res.data.success === 1) {

      await comments();
    }



  };


  const selectAllInLineText = (event) => {
    event.target.focus()
    event.target.select()
  }



  return (
    <>
      <Modal show={show} onHide={handleShow} size="xl"
      >

        <Modal.Header closeButton>
          <Modal.Title>


            <div>
              <div style={{ marginBottom: "20px", fontSize: "40px", overflowWrap: "anywhere" }}>View Detail </div>
              <div style={{ maxWidth: "150px", color: "grey" }} >

                <select
                  // id="inputState"
                  className="form-select"
                  value={status}
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
                {titleState === true ?
                  <div className="col-md-12">

                    <Form.Control

                      type="text"
                      // id="inputEmail4"
                      as="textarea"
                      rows="2"
                      style={{ marginTop: "20px", fontSize: "30px", borderRadius: "10px", width: "50%", backgroundColor: "white", border: "none" }}
                      placeholder="Add new description"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      onClick={(event) => selectAllInLineText(event)}
                    />
                  </div> :
                  <Form.Control

                    type="text"
                    id="inputEmail4"
                    as="textarea"
                    rows="2"
                    className="title-body"
                    style={{ marginTop: "20px", fontSize: "30px", borderRadius: "10px", width: "50%", backgroundColor: "white", border: "none" }}
                    placeholder="Add new description"
                    value={title}
                    disabled
                    onClick={(event) => selectAllInLineText(event)}

                  />
                }



              </div>

              <div className="Description">
                <div className="description-header" onClick={ChangeStateDescripton} onBlur={ChangeStateDescriptonOne}> Description: </div>
                {descriptionState === true ?
                  <div className="col-md-12">

                    <Form.Control

                      type="text"
                      id="inputEmail4"
                      as="textarea"
                      rows="2"
                      style={{ marginTop: "20px", fontSize: "30px", borderRadius: "10px", width: "50%", backgroundColor: "white", border: "none", cursor: "pointer" }}
                      placeholder="Add new description"
                      value={description}
                      onChange={(event) => setdescription(event.target.value)}
                      onClick={ChangeStateDescripton}
                      onBlur={ChangeStateDescriptonOne}
                    />
                  </div> :
                  <Form.Control

                    type="text"
                    id="inputEmail4"
                    as="textarea"
                    rows="2"
                    className="description-body"
                    style={{ marginTop: "20px", fontSize: "30px", borderRadius: "10px", width: "50%", backgroundColor: "white", border: "none" }}
                    placeholder="Add new description"
                    value={description}
                    disabled
                  />
                }


                {/*  */}


                {/* /.////////////////////// */}
                <div className="image">
                  <div className="image-header" > File </div>

                  <label for="inputEmail4" className="form-label label-upload" htmlFor="label-up">
                  </label>

                  <input
                    id="label-up"
                    type="file"
                    hidden
                    onChange={(event) => handleUpdateImage(event)}
                  />
                </div>



                {/* </div> */}
                {/* <div className="image">
                  <div className="image-header" onClick={ChangeState}> Image: </div>
                  {imageState === true ? <div className="col-md-12 Uploade-img">
                    <label for="inputEmail4" className="form-label label-upload" htmlFor="label-up">
                      <AiOutlinePlusCircle /> Uploade image
                    </label>

                    <input
                      id="label-up"
                      type="file"
                      hidden
                      onChange={(event) => handleUpdateImage(event)}
                    />
                    <div className="col-md-12 img-previews">
                      {preImage ? <img src={preImage}
                      /> : <span>Image</span>
                      }

                    </div>
                  </div> :
                    <div className="image-body">
                      <img src={image} />
                    </div>} */}

              </div>

              <input
                id="label-up"
                type="file"
                className='form-control'
                onChange={(event) => handleUpdateImage(event)}

              />

            </div>
            <div className="body-right">

              <div className="assignee col-md-6"  >
                <div className="assignee-title" > Assignee</div>
                <select
                  // id="inputState"
                  onClick={ChangestateAssgin}
                  className="form-select"
                  value={assignee}
                  onChange={(event) => setAssignee(event.target.value)}


                >
                  <option>
                  </option>
                  {user && user.length > 0 &&
                    user.map((item, index) => {
                      return (

                        <option key={index}>{item.username}</option>

                      )

                    })
                  }

                </select>


              </div>
              <div className="col-md-6 Reporter">
                <label for="inputEmail4" className="form-label Reporter-title">
                  reporter
                </label>
                <select
                  className="form-control"
                  id="inputEmail4"
                  value={reporter}
                  onChange={(event) => setReporter(event.target.value)}

                >

                  <option>{account.username}</option>

                </select>

              </div>
              {/* <div className="col-md-12">
                <label for="inputEmail4" className="form-label">
                  File
                </label>
                <input
                  id="label-up"
                  type="file"
                  className='form-control'
                  onChange={(event) => handleUpdateImage(event)}

                />
              </div> */}



            </div>

          </div>
          <Modal.Footer>
            <Button variant="primary" onClick={() => { updateFile(); handleUpdateCard(); handleUpdateTaskAfterCreateImage() }}
            >
              Save
            </Button>


          </Modal.Footer>
        </Modal.Body>


        {/* /////////////////////////////////// */}
        <div className="chat-option">
          <div className="chat-option-left">
            <div className="chat-option-left_title">Activity</div>
            <div className="chat-option-left_body " >Show : <span> comment</span></div>

          </div>
          {sortInput === false ?

            <div className="chat-option-right" onClick={handleChangSortInput}>

              <div className="chat-option-right_title" >Oldest first
              </div>
              <div className="chat-option-right_body " ><BsSortDownAlt /> </div>

            </div>

            :

            <div className="chat-option-right" onClick={handleChangSortInput}>

              <div className="chat-option-right_title">Newest firs
              </div>
              <div className="chat-option-right_body " ><BsSortDownAlt /> </div>

            </div>

          }
        </div>


        <div className='chat'>


          <Modal.Body>
            {sortInput === true &&

              <div className="chat-input_header">
                <div className="chat-input_img_header" >

                  <img src="https://i.pinimg.com/originals/07/a4/20/07a420f822e2d0624c76efba4fbb0b24.jpg" alt="" />
                </div>
                <div className="col-md-10 chat-input_text_header">

                  <Form.Control

                    type="text"
                    as="textarea"
                    rows="2"
                    value={inputComment}
                    onChange={(event) => setInputComment(event.target.value)}

                  />

                </div>

                <div className="chat-input_icon_header" >
                  <button type="button" className="btn button  " onClick={() => handleInputComment()}
                  >
                    <IoIosSend />
                  </button>
                </div>
              </div>
            }


            <div className='chat-body'>


              {comment && comment.length > 0 &&

                comment.map((item, index) => {

                  return (
                    <div className="chat-left col-md-10">
                      <div className="chat-left_img" >
                        <img src="https://i.pinimg.com/originals/07/a4/20/07a420f822e2d0624c76efba4fbb0b24.jpg" alt="" />
                      </div>
                      {item.createdById === account.id ?
                        <>
                          <div className="chat-left_text col-md-8">
                            <Form.Control

                              type="text"
                              as="textarea"
                              rows="1"
                              value={item.content}
                              disabled
                            />

                          </div>
                          <div className="chat-left_text_icon" onClick={() => handleDeleteComment(item._id)}><AiOutlineDelete /></div>
                        </>
                        :

                        <div className="chat-right col-md-10">
                          <div className="chat-right_icon" onClick={() => handleDeleteComment(item._id)}><AiOutlineDelete /></div>


                          <div className="col-md-8 chat-right_text">
                            <Form.Control

                              type="text"
                              as="textarea"
                              rows="1"
                              disabled
                              value={item.content}

                            />

                          </div>


                          <div className="chat-right_img" >

                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo8l-zpRmmGBlp7AcrA7ca6o9p_mdmDWP4J3zfW31b&s" alt="" />

                          </div>


                        </div>


                      }

                    </div>

                  )
                })}



            </div>
            {sortInput === false &&

              <div className="chat-input">
                <div className="chat-input_img" >

                  <img src="https://i.pinimg.com/originals/07/a4/20/07a420f822e2d0624c76efba4fbb0b24.jpg" alt="" />
                </div>
                <div className="col-md-10 chat-input_text">

                  <Form.Control

                    type="text"
                    as="textarea"
                    rows="2"
                    value={inputComment}
                    onChange={(event) => setInputComment(event.target.value)}

                  />

                </div>
                <div className="chat-input_icon" >
                  <button type="button" className="btn button  " onClick={() => handleInputComment()}
                  >
                    <IoIosSend />
                  </button>
                </div>
              </div>

            }
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}


export default ShowDeatailTask