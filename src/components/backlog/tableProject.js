import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";

import Dropdown from "react-bootstrap/Dropdown";
import { FaRegEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { InitialData } from "../action/action";
import ReactPaginate from "react-paginate";

const TableProject = (props) => {
  // Invoke when user click to request another page.
  const { listProject } = props;

  // const handlePageClick = (event) => {
  //   console.log(`User requested page number ${event.selected}`);
  // };

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">id</th>

            <th scope="col">Name Project</th>
            {/* <th scope="col">Member</th> */}
            <th scope="col">type</th>
            <th scope="col">Created Date</th>
            <th scope="col">updated At</th>
          </tr>
        </thead>
        <tbody>
          {listProject &&
            listProject.length > 0 &&
            listProject.map((item, index) => {
              return (
                <tr>
                  <th scope="row" style={{ fontSize: "25px" }} key={index}>
                    {" "}
                    {index + 1}
                  </th>
                  <td style={{ color: "blue", fontSize: "25px" }}>
                    {item._id}{" "}
                  </td>
                  <td style={{ fontSize: "25px" }}>{item.name} </td>
                  {/* <td>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="(4)&nbsp;user"
                    >
                      {" "}
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </DropdownButton>
                  </td> */}

                  <td style={{ fontSize: "25px" }}>{item.type}</td>
                  <td>
                    {" "}
                    <Button variant="primary">{item.createdAt}</Button>
                  </td>
                  <td>
                    {" "}
                    <Button variant="primary">{item.updatedAt}</Button>
                  </td>
                  {/* <td>
                    <span>
                      <FaRegEye
                        style={{
                          color: "red",
                          fontSize: "30px",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                    <span>
                      <AiFillEdit
                        style={{
                          color: "blue",
                          fontSize: "30px",
                          marginRight: "15px",
                          marginLeft: "15px",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                    <span>
                      {" "}
                      <MdOutlineRemoveCircleOutline
                        style={{
                          color: "blue",
                          fontSize: "30px",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={10}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      /> */}
    </div>
  );
};

export default TableProject;
