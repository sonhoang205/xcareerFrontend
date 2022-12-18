import { useState } from "react";
import "./Search.scss";


const Search = (props) => {
  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    e.preventdefault()
  }
  console.log(search)
  return (

    <nav className="navbar  ">
      <div className="container-fluid" onSubmit={handleSearch}>
        <form className=" col-10" >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

        </form>
      </div>
    </nav >
  );
};

export default Search;
