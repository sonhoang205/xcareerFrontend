import "./login.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleregister = () => {
  //   const validateEmail = (email) => {
  //     return String(email)
  //       .toLowerCase()
  //       .match(
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //       );
  //   };
  const handleClose = () => {
    setName("");
    setUsername("");
    setPassword("");
  };

  const handlesubmit = async () => {
    if (!name) {
      toast.error("palease enter name");
      return;
    }
    if (!username) {
      toast.error("palease enter username");
      return;
    }
    if (password.length < 8) {
      toast.error("password is required 8 - 15 character");
      return;
    } else if (!password) {
      toast.error("password enter pass ");
      return;
    }
    let res = await axios.post("http://localhost:9090/api/auth/register", {
      name,
      username,
      password,
    });
    if (res && res.data.success === 1) {
      toast.success("register success");
      handleClose();
      navigate("/login");
    }
    if (res && res.data.success === 0) {
      toast.error(res.data.message);
      return;
    }
  };

  return (
    <div className="main">
      <form className="form" id="form-1">
        <h3 className="heading">you're welcome</h3>
        <p className="desc">Register </p>

        <div className="spacer"></div>

        <div className="form-group">
          <label for="fullname" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder=" Enter your name "
            className="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <span className="form-message"></span>
        </div>
        <div className="form-group">
          <label for="fullname" className="form-label">
            Username
          </label>
          <input
            type="text"
            placeholder=" Enter your name "
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <span className="form-message"></span>
        </div>
        <div className="form-group">
          <label for="password" className="form-label">
            Password{" "}
          </label>
          <input
            type="password"
            placeholder="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <span className="form-message"></span>
        </div>

        <div>
          <button
            type="button"
            className="btn btn-success submit"
            onClick={() => handlesubmit()}
          >
            Sign Up
          </button>
        </div>
        <div>
          <button type="button" className="btn   submit">
            <Link to="/"> Back to HomePage</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
