import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {store , persistor} from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./components/board/Board";
import Backlog from "./components/backlog/backlog";
import Homepage from "./components/Home/homepage";
import Login from "../src/components/Auth/login";
import Register from "../src/components/Auth/register";
import Listuser from "../src/components/listuser";
import Workspaces from "./components/workspace/workspaces";
import WorkspaceDetails from "./components/workspace/detailsworkspace/Details";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from "../src/components/routes/PrivateRouter";
import "nprogress/nprogress.css";
import { PersistGate } from 'redux-persist/integration/react'

const NotFound = () => {
  return (
    <div
      className="alert alert-danger"
      role="alert"
      style={{
        fontSize: "40px",
        marginTop: "200px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      Not Found 404
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>

    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Routes>
        {/* nested router */}
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <PrivateRouter>
                <Homepage />{" "}
              </PrivateRouter>
            }
          />
          <Route path="workspace" element={<Workspaces />} />
          <Route path="Profile" element={<WorkspaceDetails />} />

          <Route
            path="workspace/workspacedetails/:id"
            element={<WorkspaceDetails />}
          />
        </Route>
        <Route path="Backlog" element={<Backlog />} />

        <Route
          path="workspace/workspacedetails/:id/project/:id"
          element={<Board />}
        />
        <Route path="/listuser" element={<Listuser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
          </PersistGate>

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
