import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import http from "../../http-common";
import { toast } from "react-toastify";

const Example = (props) => {
    const { show, handleShow, projectId, todo, inProgress, Done, Cancel } = props;
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [status, setstatus] = useState("To Do");
    const [assignee, setAssignee] = useState("");
    const [reporter, setReporter] = useState("");

    const handleCreatcard = async () => {
        let dataCreate = {
            status: status,
            projectID: projectId,
            title: title,
            description: description,
            assignee: assignee,
            reporter: reporter,
        };
        console.log(dataCreate);

        let res = await http.post(
            "http://localhost:9090/api/task/create",
            dataCreate
        );
        if (!projectId) {
            toast.error("projectId not Found");
            return;
        }
        if (!title) {
            toast.error("please enter name");
            return;
        }

        if (res && res.data.success === 1) {
            console.log("res", res);
            toast.success("create new card success");
            setTitle("");
            setdescription("");
            setstatus("...");
            setAssignee("");
            setReporter("");
            handleShow();
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
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">
                                assignee
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                value={assignee}
                                onChange={(event) => setAssignee(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">
                                reporter
                            </label>
                            <input
                                className="form-control"
                                id="inputEmail4"
                                value={reporter}
                                onChange={(event) => setReporter(event.target.value)}
                            />
                        </div>

                        {/* <div className="col-md-12">
                            <label for="inputEmail4" className="form-label">
                                ProjectId
                            </label>
                            <input
                                className="form-control"
                                id="inputEmail4"
                                value={abc}
                                onChange={(event) => setReporter(event.target.value)}
                                disabled
                            />
                        </div> */}
                        <div className="col-md-12">
                            <label for="inputPassword4" className="form-label">
                                status
                            </label>

                            <select
                                // id="inputState"
                                class="form-select"
                                value={status}
                                onChange={(event) => setstatus(event.target.value)}
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
                    <Button variant="primary" onClick={handleCreatcard}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default Example