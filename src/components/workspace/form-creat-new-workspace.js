import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import http from "../../http-common";
import {creatNewWorkSpace} from "../util/apiService"
function Example(props) {
  const { view, handleShowView, fetchData } = props;

  const [name, setName] = useState("");

  const [type, setType] = useState("Choose");

  const handleCreatWorkSpace = async () => {
 let res = await creatNewWorkSpace(name )
    if (!name) {
      toast.error("please enter name");
      return;
    }
    if (res && res.data.success === 1) {
      console.log("res", res);
      toast.success("create new workspace success");
      setName("");
      setType("");
      handleShowView();
      await fetchData();
    }

    if (res && res.data.success === 0) {
      toast.error(res.data.message);
      return;
    }
  };
  return (
    <>
      <Modal show={view} onHide={handleShowView} size="l">
        <Modal.Header closeButton>
          <Modal.Title>New Workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label for="inputEmail4" className="form-label">
                Name
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
{/* 
            <div className="col-md-12">
              <label for="inputPassword4" className="form-label">
                Type
              </label>

              <select
                id="inputState"
                className="form-select"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option>Choose</option>
                <option>Sales</option>
                <option>Operations</option>
                <option>legal</option>
                <option>Human Resources</option>
                <option>Maketing</option>
                <option>Customer Service</option>
                <option>Finsnce</option>
                <option>It support</option>
                <option>Software Development</option>
                <option>Other</option>
              </select>
            </div> */}
            <div className="col-md-12"></div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowView}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreatWorkSpace}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Example;
