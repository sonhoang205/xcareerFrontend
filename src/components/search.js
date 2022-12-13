import { useState } from "react";
import "./Search.scss";

const Search = (props) => {
  const [search ,setSearch]= useState('')
  const handleSearch=(e)=> {
    e.preventdefault()
  }
console.log(search)
  return (
    
    <nav className="navbar  ">
      <div className="container-fluid" onSubmit={handleSearch}>
        <form className=" col-5" >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(event)=>setSearch(event.target.value)}
          />
          <button className="btn btn-outline-success mx"  
>
            Search
          </button>
        </form>
      </div>
    </nav >
  );
};

export default Search;
