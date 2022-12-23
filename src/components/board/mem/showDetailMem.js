import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Type } from "react-bootstrap-icons";
import http from "../../../http-common";
import "./creatmem.scss";

const ShowDetailMem = (props) => {
    const { showDeatailUser, handleShowDeatailMem, dataUser, projectId, abc, member } = props
    const account = useSelector((state) => state.user.account);

    const params = useParams();

    const handleKicktmem = async () => {
        let userId = dataUser._id
        let data = await axios.delete(`http://localhost:9090/api/member/kick?projectId=${projectId}&userId=${userId}`,
        )
        if (data && data.data.success === 1) {
            toast.success("delete mem success");
            handleShowDeatailMem()
            await abc()
        }

        if (data && data.data.success === 0) {
            toast.error(data.data.message);
            return;
        }
    };

    return (
        <>
            <Modal show={showDeatailUser} onHide={handleShowDeatailMem} size="s" backdrop="static"
            >

                <Modal.Body>
                    <form className="row g-3 modal-show-user" >

                        <fieldset class="border rounded-3 p-3">
                            <legend class="float-none w-auto px-3"><div className="title-user-modal" >Delete User ???</div></legend>
                            {dataUser ?
                                <Modal.Body>
                                    <div style={{ fontSize: "25px" }}> Are you sure to delete this User <b>{dataUser.username}</b></div>
                                </Modal.Body>
                                :
                                <Modal.Body>
                                    Are you sure to delete this User <b>...</b>
                                </Modal.Body>
                            }
                        </fieldset>
                    </form>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleShowDeatailMem}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleKicktmem}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ShowDetailMem;