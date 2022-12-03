import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useSelector } from "react-redux";
import _ from "lodash";

function Example(props) {
  const { show, handleShowProfile, profile } = props;
  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);
  return (
    <Modal show={show} onHide={handleShowProfile}>
      <Modal.Header closeButton>
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      {islogin === true && (
        <>
          <Modal.Body> Name: {` ${account.username}`}</Modal.Body>
          <Modal.Body> id: {` ${account.id}`}</Modal.Body>
        </>
      )}

      <Modal.Footer>
        <Button variant="secondary" onClick={handleShowProfile}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Example;
