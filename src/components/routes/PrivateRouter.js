import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const PrivateRouter = (props) => {
  //   console.log(props);
  const islogin = useSelector((state) => state.user.islogin);
  const navigate = useNavigate();
  if (!islogin) {
    navigate("/login");
  }
  return <div>{props.children}</div>;
};

export default PrivateRouter;
