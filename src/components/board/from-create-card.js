import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import http from "../../http-common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

const Example = (props) => {
    const { show, handleShow, projectId, todo, inProgress, Done, Cancel, user, setImage, image, setDataMedia, setDataCreatedTask, dataCreatedTask, dataMedia, setTotalData, setTaskAfterUpdate } = props;
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [status, setstatus] = useState("To Do");
    const [assignee, setAssignee] = useState("");
    const [reporter, setReporter] = useState("");
    const islogin = useSelector((state) => state.user.islogin);
    const account = useSelector((state) => state.user.account);





    const handleCreatcard = async () => {
        let dataCreate = {
            status: status,
            projectID: projectId,
            title: title,
            description: description,
            assignee: assignee,
            reporter: reporter,
        };

        let Creatcard = await http.post(
            "https://xcareer1backend.onrender.com/api/task/create",
            dataCreate
        );

        if (!title) {
            toast.error("please enter name");
            return;
        }

        if (Creatcard && Creatcard.data.success === 1) {
            setDataCreatedTask(Creatcard.data.data._id)
            console.log("dataCreatedTask", Creatcard.data.data._id)
            toast.success("create new card success");
            setTitle("");
            setdescription("");
            setAssignee("");
            setReporter("");
            handleShow();
            await todo();
            await inProgress();
            await Done();
            await Cancel();

        }

        if (Creatcard && Creatcard.data.success === 0) {
            toast.error(Creatcard.data.message);
            return;
        }
    };




    console.log("reporter", reporter)


    return (
        <>
            <Modal show={show} onHide={handleShow} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title> create new card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">
                                title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">
                                description
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                value={description}
                                onChange={(event) => setdescription(event.target.value)}
                            />
                        </div>


                        {/* <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">
                                image
                            </label>
                            <input
                                id="label-up"
                                type="file"
                                name="file"
                                onChange={(event) => handleSaveImage(event)}
                            />
                        </div> */}

                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label">
                                assignee
                            </label>

                            <select
                                // id="inputState"
                                className="form-select"
                                value={assignee}
                                onChange={(event) => setAssignee(event.target.value)}


                            >
                                <option>
                                    ...
                                </option>
                                {user && user.length > 0 &&
                                    user.map((item, index) => {
                                        return (
                                            <>

                                                <option>{item.username}</option></>


                                        )
                                    })
                                }

                            </select>
                        </div>

                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">
                                reporter
                            </label>
                            <select
                                className="form-control"
                                id="inputEmail4"
                                value={account.username}

                            >

                                <option>{account.username}</option>

                            </select>

                        </div>

                        <div className="col-md-12">
                            <label for="inputPassword4" className="form-label">
                                status
                            </label>

                            <select
                                // id="inputState"
                                className="form-select"
                                value={status}
                                onChange={(event) => setstatus(event.target.value)}
                                disabled

                            >
                                <option>To Do</option>
                                {/* <option>In Progress</option>
                                <option>Done</option> */}
                            </select>
                        </div>
                        <div className="col-md-12"></div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleCreatcard(); }}>
                        Save
                    </Button>
                    {/* <Button variant="primary" onClick={updateFile}>
                        Save image
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default Example