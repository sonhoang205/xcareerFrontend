import { useEffect } from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/backlog/sidebar";
import axios from "axios";
import "./Listuser.scss";
import ReactPaginate from 'react-paginate';

const Listuser = () => {
  const [list, setList] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [totalUser, setTotalUser] = useState("0");

const handlePageClick =()=>{}


  const fetchData = async () => {
    let res = await axios.get("http://localhost:9090/api/auth/seeusers");
    if (res && res.data && res.data.success === 1) {
    console.log("res",res)
      setList(res.data);
      setTotalUser(res.data.length)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(list);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <FaBars
          className="admin-header-icon"
          onClick={() => setCollapsed(!collapsed)}
        />
        <div className="admin-main">
          <h1 style={{ color: "red", fontSize: "50px", marginBottom: "20px" }}>
            {" "}
            List user
          </h1>
          <table className="table" style={{}}>
            <thead className="thead-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">id</th>

                <th scope="col">Username</th>

                <th scope="col">Password</th>
                <th scope="col">Name</th>
                <th scope="col">CreatedAt</th>
              </tr>
            </thead>
            <tbody>
              {list.data &&
                list.data.length > 0 &&
                list.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item._id}</td>

                      <td>{item.username}</td>
                      <td>{item.password}</td>
                      <td>{item.name}</td>
                      <td>{item.createdAt}</td>
                    </tr>
                  );
                })}
            </tbody>
         
          </table>
          <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        
      />
        </div>
      </div>
    </div>
  );
};
export default Listuser;
