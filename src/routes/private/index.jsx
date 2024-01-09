
import React from "react";
import { useEffect, useState } from "react";
import {  Outlet, useNavigate } from "react-router-dom";

const Private= () => {
  const navigate= useNavigate();
  const [checkedLogin, setCheckedLogin] = useState("");

  useEffect(() => {
    const token= localStorage.getItem("token");
    if (token) {
      setCheckedLogin(token);
    } else {
      navigate("/signin");
    }
  });
  return <div>{checkedLogin ? <>
    <Outlet />
  </>
    : null}</div>;
}

export default Private;
