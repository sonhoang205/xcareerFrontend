import { useEffect } from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/backlog/sidebar";
import axios from "axios";
import "./Listuser.scss";

const Listuser = () => {
  const [list, setList] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const fetchData = async () => {
    let res = await axios.get("http://localhost:9090/api/auth/seeusers");
    if (res && res.data && res.data.success === 1) {
      setList(res.data);
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
          <table class="table" style={{}}>
            <thead class="thead-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Usernam</th>
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

                      <td>{item.username}</td>
                      <td>{item.password}</td>
                      <td>{item.name}</td>
                      <td>{item.createdAt}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Listuser;
