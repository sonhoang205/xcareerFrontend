import "./Search.scss";

const Search = (props) => {
  return (
    <nav className="navbar  ">
      <div class="container-fluid">
        <form className=" col-3">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success mx" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Search;
