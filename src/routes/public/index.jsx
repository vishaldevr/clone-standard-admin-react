import React from "react";
import { useEffect, useState } from "react";
import {  Outlet, useNavigate } from "react-router-dom";

const Public= () => {
  const navigate= useNavigate();
  const [checkedLogin, setCheckedLogin] = useState("");

  useEffect(() => {
    const token= localStorage.getItem("token");
    if (token) {
      setCheckedLogin(token);
    }
  });
  return <div>{checkedLogin ? <>
    {navigate('/')}
  </>
    : <Outlet />}</div>;
}

export default Public;
