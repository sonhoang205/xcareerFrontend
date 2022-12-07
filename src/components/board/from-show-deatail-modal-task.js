import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import http from "../../http-common";
import { toast } from "react-toastify";
import _ from "lodash";

const UpdateCard = (props) => {
    const { show, handleShow, projectId, dataUpdate, todo, inProgress, Done, Cancel } = props;
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [status, setstatus] = useState("To Do");
    const [assignee, setAssignee] = useState("");
    const [id, setId] = useState("");
    const [reporter, setReporter] = useState("");


    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setTitle(dataUpdate.title);
            setdescription(dataUpdate.description);
            setstatus(dataUpdate.status);
            setAssignee(dataUpdate.assignee);
            setReporter(dataUpdate.reporter);
            setId(dataUpdate._id);

        }
    }, [dataUpdate]);



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
            console.log("res", res);
            toast.success("update card success");
            setTitle("");

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
            <Modal show={show} onHide={handleShow} size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title> update card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
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



                        <div className="col-md-12">
                            <label for="inputPassword4" className="form-label">
                                status
                            </label>

                            <select
                                id="inputState"
                                class="form-select"
                                value={status}
                                onChange={(event) => setstatus(event.target.value)}
                            >
                                <option>To Do</option>
                                <option>In Progress</option>
                                <option>Done</option>
                                <option>Cancel</option>

                            </select>
                        </div>
                        <div className="col-md-12"></div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateCard}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default UpdateCard