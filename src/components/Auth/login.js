import "./login.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ImSpinner3 } from "react-icons/im";
import NProgress from "nprogress";
import axios from "axios";
import Language from "../header/language"
import { useTranslation, Trans } from 'react-i18next';

NProgress.start();
NProgress.done();
const Login = (props) => {
  const { t } = useTranslation();

  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onKeyDown = (event) => {
    if (event && event.key === "Enter") {
      handleLogin()
    }

  }

  const handleClose = () => {
    setName("");
    setPassword("");
  };
  const handleLogin = async () => {
    if (!username) {
      toast.error("palease enter name");
    }

    if (!password) {
      toast.error("please enter password");
    }
    setLoading(true);
    NProgress.start();

    let res = await axios.post("https://xcareer1backend.onrender.com/api/auth/login", {
      username: username,
      password: password,
    });
    // console.log("res ", res);
    if (res && res.data.success === 1) {
      console.log("res", res)
      //set bang localstorage
      dispatch({
        type: "FETCH_USER_LOGIN_SUCCES",
        payload: res,
      });
      localStorage.setItem("user", JSON.stringify(res.data.data));
      NProgress.done();

      toast.success("login success");
      handleClose();
      setLoading(false);
      navigate("/");
      // console.log(res);
    }
    if (res && res.data.success === 0) {
      toast.error("password wrong , please try again");
      setLoading(false);
    }
  };

  return (
    <div className="main">

      <form className="form" id="form-1">
        <h3 className="heading">{t('login.First')}
        </h3>
        {t('Details.Second')}

        <p className="desc">{t('login.First')} </p>

        <div className="spacer"></div>

        <div className="form-group">
          <label htmlor="fullname" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => onKeyDown(event)}

          />{" "}
          <span className="form-message"></span>
        </div>

        <div className="form-group">
          <label className="form-label">PassWord </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => onKeyDown(event)}

          />
        </div>

        <div>
          <button
            type="button"
            className="btn btn-success submit"
            onClick={() => handleLogin()}
          >
            {loading === true && (
              <span>
                <ImSpinner3 className="loaderIcon" />
                Login
              </span>
            )}{" "}
            {loading === false && <span>Login</span>}
          </button>
        </div>
        <div>
          Don't you have account yet ??
          <button type="button" className="btn  submit">
            <Link to="/register"> Sign up now</Link>
          </button>
        </div>
        <div>
          <button type="button" class="btn   submit">
            <Link to="/"> Back to HomePage</Link>
          </button>
        </div>
      </form>

    </div>
  );
};

export default Login;
