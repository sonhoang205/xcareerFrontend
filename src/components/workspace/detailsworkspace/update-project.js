import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
// import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";
import http from "../../../http-common";

const UpdateProject = (props) => {
  const { showUpdateModal, handleShowUpdateModal, dataParam, update } = props;
  //   const islogin = useSelector((state) => state.user.islogin);
  //   const account = useSelector((state) => state.user.account);
  // console.log("dataUpdate", dataUpdate);

  const [name, setName] = useState("");
  const [type, setType] = useState("Choose");
  const [id, setId] = useState("");
  console.log(name);
  useEffect(() => {
    if (!_.isEmpty(update)) {
      setName(update.name);
      setType(update.type);
      setId(update._id);
    }
  }, [update]);
  const handleUpdateProject = async () => {
    let data = {
      name: name,
      type: type,
    };
    let adddd = await http.put(
      `http://localhost:9090/api/project/${id}`,
      data
    );
    if (adddd && adddd.data.success === 1) {
      console.log("res", adddd);

      toast.success("update project success");
      setName("");
      setType("");
      handleShowUpdateModal();
      await dataParam();
    }
    if (adddd && adddd.data.success === 0) {
      toast.error(adddd.data.message);
      return;
    }
  };
  return (
    <>
      <Modal show={showUpdateModal} onHide={handleShowUpdateModal} size="l">
        <Modal.Header closeButton>
          <Modal.Title>update Project</Modal.Title>
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
                // onChange={(event) => setId(event.target.value)}
                disabled
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
              </select>
            </div>
            <div className="col-md-12"></div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UpdateProject;
