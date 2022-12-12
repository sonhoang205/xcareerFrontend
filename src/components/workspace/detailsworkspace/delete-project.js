import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import http from "../../../http-common";

const DeleteProject=(props)=> {
  const { showDeleteModal, handleShowDeleteModal, dataDelete, abc } = props;
  const handleDeleteProject = async (userId) => {
    let res = await http.delete(
      `http://localhost:9090/api/project/${dataDelete._id} `
    );

    if (res && res.data.success === 1) {
      console.log("dataDelete", dataDelete);
      console.log("res", res);

      toast.success("delete  project success");
      handleShowDeleteModal();
      await abc();
    }

    if (res && res.data.success === 0) {
      toast.error(res.data.message);
      return;
    }
  };
  return (
    <>
      <Modal
        show={showDeleteModal}
        onHide={handleShowDeleteModal}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete ???</Modal.Title>
        </Modal.Header>
        {dataDelete && dataDelete.name ? (
          <>
            <Modal.Body>
              Are you sure to delete Workspace :<b>{dataDelete.name}</b>
            </Modal.Body>
          </>
        ) : (
          <Modal.Body>
            Are you sure to delete Workspace :<b>...</b>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowDeleteModal}>
            Exit
          </Button>
          <Button variant="primary" onClick={handleDeleteProject}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProject;
