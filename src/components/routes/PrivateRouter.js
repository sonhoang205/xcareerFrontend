// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Router, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = (props) => {
  console.log("check props:", props)
  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);


  if (!islogin) {
    return <Navigate to="/login"></Navigate >
  }
  return (
    <div>
      {props.children}

    </div>
  )


};

export default PrivateRoute;
