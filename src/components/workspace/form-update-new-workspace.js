import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import _ from "lodash";
import http from "../../http-common";

function UpdateWorkspace(props) {
  const { HandleShowUpdate, setHandleShowUpdate, Update, fetchData } = props;
  //   console.log(dataUpdate);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const [type, setType] = useState("Choose");
  useEffect(() => {
    if (!_.isEmpty(Update)) {
      setName(Update.name);
      setType(Update.type);
      setId(Update._id);
    }
  }, [Update]);
  console.log("Update", Update);
  const handleUpdateWorkSpace = async () => {
    let data = {
      name: name,
      type: type,
    };
    let res = await http.put(
      `http://localhost:9090/api/workspace/${id}`,
      data
    );
    console.log(res);
    if (res && res.data.success === 1) {
      console.log("res", res);
      toast.success("update new workspace success");
      setName("");
      setType("");
      setHandleShowUpdate();
      await fetchData();
    }
    if (res && res.data.success === 0) {
      toast.error(res.data.message);
      return;
    }
  };
  return (
    <>
      <Modal show={HandleShowUpdate} onHide={setHandleShowUpdate} size="l">
        <Modal.Header closeButton>
          <Modal.Title>Update Workspace</Modal.Title>
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
              <label for="inputEmail4" className="form-label">
                Id
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                value={id}
                onChange={(event) => setId(event.target.value)}
                disabled
              />
            </div>
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
            </div>
            <div className="col-md-12"></div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setHandleShowUpdate}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateWorkSpace}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default UpdateWorkspace;
