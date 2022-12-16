import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Type } from "react-bootstrap-icons";
import http from "../../../http-common";
 import "./creatmem.scss";

const CreatMem=(props) =>{
  const { show, handleShow  } = props;
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
    
    }

    if (res && res.data.success === 0) {
      toast.error(res.data.message);
      return;
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleShow} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add mem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="add-mem-container">
            <div className="list-user">
                <h2>All member</h2>
                <div className="use-info">
                    <div className="use-img">
                        <img src="https://png.pngtree.com/png-vector/20190623/ourlarge/pngtree-accountavataruser--flat-color-icon--vector-icon-banner-templ-png-image_1491720.jpg" alt="" />
                    </div>
                    <div className="user-name">
                        Hoang an son
                    </div>
                </div>
            </div>
            <div className="render-member-add">aaa</div>
        </div>
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
export default CreatMem;
