import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import http from "../../../http-common";
import { useTranslation, Trans } from 'react-i18next';

const DeleteProject = (props) => {
  const { t } = useTranslation();

  const { showDeleteModal, handleShowDeleteModal, dataDelete, abc } = props;
  const handleDeleteProject = async (userId) => {
    let res = await http.delete(
      `https://xcareer1backend.onrender.com/api/project/${dataDelete._id} `
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

          <Modal.Title> {t('deleteProject.First')}</Modal.Title>
        </Modal.Header>
        {dataDelete && dataDelete.name ? (
          <>
            <Modal.Body>
              {t('deleteProject.Second')} :<b>{dataDelete.name}</b>
            </Modal.Body>
          </>
        ) : (
          <Modal.Body>
            {t('deleteProject.Second')} :<b>...</b>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowDeleteModal}>
            {t('deleteProject.Third')}
          </Button>
          <Button variant="primary" onClick={handleDeleteProject}>
            {t('deleteProject.Fourth')}

          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProject;
