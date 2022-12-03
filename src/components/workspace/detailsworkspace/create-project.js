import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Type } from "react-bootstrap-icons";
import http from "../../../http-common";

function Example(props) {
  const { show, handleShow, dataParam } = props;
  const params = useParams();
  const workspaceId = params.id;
  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);
  const [name, setName] = useState("");

  const [type, setType] = useState("Choose");

  const handleCreatProject = async () => {
    let dataCreate = {
      workspaceId: workspaceId,
      name: name,
      type: type,
      lead: ` ${account.username}`,
    };
    console.log(dataCreate);

    let res = await http.post(
      `http://localhost:9090/api/project/create`,
      dataCreate
    );
    if (!name) {
      toast.error("please enter name");
      return;
    }
    if (res && res.data.success === 1) {
      console.log("res", res);
      toast.success("create new project success");
      setName("");
      setType("");
      handleShow();
      await dataParam();
    }

    if (res && res.data.success === 0) {
      toast.error(res.data.message);
      return;
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleShow} size="l">
        <Modal.Header closeButton>
          <Modal.Title>New Project</Modal.Title>
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

            <div className="col-md-12">
              <label for="inputPassword4" className="form-label">
                Type
              </label>

              <select
                id="inputState"
                class="form-select"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option>Choose</option>
                <option>Kanban software development</option>
                <option>Basic software development</option>
                <option>Task management</option>
                <option>Project management</option>
                <option>Process management</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-md-12"></div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreatProject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Example;
