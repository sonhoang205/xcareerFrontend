import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import http from "../../http-common";
import {DeleteWorkSpace} from "../util/apiService"
const Delete=(props)=> {
  const { showDelete, handleDeleteWorkspace, dataDelete, fetchData } =
    props;
  const handleDeleteWorkSpace = async () => {
    let res = await DeleteWorkSpace(dataDelete.id)
    if (res && res.data.success === 1) {
      console.log("res", res);
      toast.success("delete  workspace success");
      handleDeleteWorkspace();
      await fetchData();
    }
    if (res && res.data.success === 0) {
      toast.error(res.data.message);
      return;
    }
  };
  return (
    <>
      <Modal
        show={showDelete}
        onHide={handleDeleteWorkspace}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete ???</Modal.Title>
        </Modal.Header>
        {dataDelete && dataDelete.name ? (
          <>
            <Modal.Body>
              Are you sure to delete this Workspace name=
              <b>{dataDelete.name}</b>
            </Modal.Body>
          </>
        ) : (
          <Modal.Body>
            Are you sure to delete this user.name=<b>...</b>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteWorkspace}>
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

export default Delete;
