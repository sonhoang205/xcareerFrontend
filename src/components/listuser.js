import { useEffect } from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/backlog/sidebar";
import axios from "axios";
import "./Listuser.scss";
import ReactPaginate from 'react-paginate';
import Search from "../components/search";
import "./Search.scss"
const Listuser = () => {
  const [lists, setLists] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [totalUser, setTotalUser] = useState("0");
  // 
  const [search ,setSearch]= useState('')
  




const handlePageClick =()=>{}


  const fetchData = async () => {
    let res = await axios.get("http://localhost:9090/api/auth/seeusers");
    if (res && res.data && res.data.success === 1) {
    console.log("res",res)
      setLists(res.data.data);
      setTotalUser(res.data.length)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


//   const keyWord = ["_id","username" ,"name",""]
//   const Search=(data)=> {
//     return data.filter((item)=>item.username.includes(search))
//   }
// console.log("new",Search(lists))

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
          {/* ////// */}
          <nav className="navbar  ">
      <div className="container-fluid" >
        <form className=" col-5" >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(event)=>setSearch(event.target.value)}
          />
          
        </form>
      </div>
    </nav >

            {/* ////  */}
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
              {lists &&
                lists.length > 0 &&
                lists.filter((list)=>
                list.username.includes(search) ||
                list._id.includes(search)||
                list.name.includes(search)||
                list.createdAt.includes(search)

                ).map((list, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{list._id}</td>

                      <td>{list.username}</td>
                      <td>{list.password}</td>
                      <td>{list.name}</td>
                      <td>{list.createdAt}</td>
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
