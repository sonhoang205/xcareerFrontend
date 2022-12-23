import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import http from "../../http-common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

const Example = (props) => {
    const { show, handleShow, projectId, todo, inProgress, Done, Cancel, user, setImage, image, setDataMedia, setDataCreatedTask, dataCreatedTask, dataMedia, setTotalData } = props;
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [status, setstatus] = useState("To Do");
    const [assignee, setAssignee] = useState("");
    const [reporter, setReporter] = useState("");
    const islogin = useSelector((state) => state.user.islogin);
    const account = useSelector((state) => state.user.account);




    console.log("dataMedia", dataMedia)

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
            "http://localhost:9090/api/task/create",
            dataCreate
        );

        if (!title) {
            toast.error("please enter name");
            return;
        }

        if (Creatcard && Creatcard.data.success === 1) {
            console.log("res", Creatcard.data.data._id);
            setDataCreatedTask(Creatcard.data.data._id)
            console.log("DataCreatedTask", dataCreatedTask);

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



    const updateFile = async () => {
        const data = new FormData();
        data.append('file', image);


        let creatFile = await axios({
            method: 'post',
            url: 'http://localhost:9090/api/upload/disk',
            data: data,
            headers: {
                'Content-Type': `multipart/form-data;`,
            },
        });


        if (creatFile && creatFile.data.success === 1) {
            toast.success("update file success");
            setDataMedia(creatFile.data.data)
            console.log("creatFile", creatFile)
            setImage("")
        }


    }
    const handleUpdateImage = (event) => {
        setImage(event.target.files[0])
        console.log("update", event.target.files[0])


    }

    const handleUpdateTaskAfterCreateImage = async () => {
        // taskId: dataCreatedTask,
        //     fileName: dataMedia

        let res = await http.put(
            `http://localhost:9090/api/task/updatefile?taskId=${dataCreatedTask}&fileName=${dataMedia}`

        );
        if (res && res.data.success === 1) {
            console.log("resaaa", res)
        };
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
                        <div className="col-md-12">
                            <label for="inputEmail4" className="form-label">
                                File
                            </label>
                            <input
                                id="label-up"
                                type="file"
                                className='form-control'
                                onChange={(event) => handleUpdateImage(event)}

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
                                value={reporter}
                                onChange={(event) => setReporter(event.target.value)}

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
                    <Button variant="primary" onClick={() => { handleCreatcard(); updateFile(); handleUpdateTaskAfterCreateImage() }}>
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