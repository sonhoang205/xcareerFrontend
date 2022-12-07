import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import http from "../../http-common";
import { AiFillFile } from "react-icons/ai";

const DeleteCard = (props) => {
    const { show, handleShow, todo, inProgress, Done, Cancel, datadelete } = props;


    const handleDeleteWorkSpace = async () => {
        let res = await http.delete(
            `http://localhost:9090/api/task/${datadelete._id} `
        );
        if (res && res.data.success === 1) {
            console.log("datadelete", datadelete);

            console.log("res", res);
            toast.success("delete  card success");
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
            <Modal
                show={show}
                onHide={handleShow}
                animation={false}
                backdrop="static"
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete ???</Modal.Title>
                </Modal.Header>
                {datadelete && datadelete.title ? (
                    <>
                        <Modal.Body>
                            Are you sure to delete this task=
                            <b>{datadelete.title}</b>
                        </Modal.Body>
                    </>
                ) : (
                    <Modal.Body>
                        Are you sure to delete this user.name=<b>...</b>
                    </Modal.Body>
                )}

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Exit
                    </Button>
                    <Button variant="primary" onClick={handleDeleteWorkSpace}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteCard;
