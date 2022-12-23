import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Type } from "react-bootstrap-icons";
import http from "../../../http-common";
import "./creatmem.scss";
import { listUser } from "../../util/apiService"
import { NavItem } from "react-bootstrap";
import Select from 'react-select'
import { creatMem } from "../../util/apiService"
import { FaUserCircle } from "react-icons/fa";
import { AiFillPlusSquare } from "react-icons/ai";
import Search from "../../search"
const CreatMem = (props) => {
  const { show, handleShow, projectId, abc, user } = props;
  const params = useParams();
  const [search, setSearch] = useState('')

  const [userdata, setUserdata] = useState("");

  const [member, setMember] = useState();
  const [checkstatusmem, setCheckstatusmem] = useState(false);




  const handleCreatmem = async (item) => {
    setUserdata(item._id)


    let dataCreate = {
      projectId: projectId,
      userId: userdata,

    };
    let res = await http.post(
      `http://localhost:9090/api/member/add`,
      dataCreate
    );

    if (res && res.data.success === 1) {
      toast.success("Create mem success");
      setCheckstatusmem(true)
      abc()
    }

    if (res && res.data.success === 0) {
      toast.error(res.data.message);
      return;
    }
  };

  const listmem = async () => {
    let data = await listUser()
    if (data && data.data && data.data.success === 1) {
      setMember(data.data.data)
    }
  };
  useEffect(() => {
    listmem();
  }, []);





  return (
    <>
      <Modal show={show} onHide={handleShow} size="s">

        <Modal.Body>
          <fieldset class="border rounded-3 p-3">
            <legend class="float-none w-auto px-3">Add people to project</legend>
            <nav className="navbar  ">
              <div className="container-fluid" >
                <form className=" col-10" >
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search name "
                    aria-label="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />

                </form>
              </div>
            </nav >
            <div className="table-member">
              {member && member.length > 0 &&
                member.filter((item) =>
                  item.username.includes(search)
                ).map((item, index) => {
                  return (
                    <div className="member">
                      {checkstatusmem === false ?
                        <>
                          <div className="mem-info">
                            <span><FaUserCircle /></span>
                            {item.username}

                          </div>
                          <div className="icon" onClick={() => handleCreatmem(item)} ><AiFillPlusSquare /> </div>

                        </>
                        :
                        <>
                          <div className="mem-info">
                            <span><FaUserCircle /></span>
                            {item.username}

                          </div>
                          <div className="icon" onClick={() => handleCreatmem(item)} ><AiFillPlusSquare /> </div>

                        </>
                      }

                    </div>
                  )
                })
              }


            </div>

          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}
export default CreatMem;
