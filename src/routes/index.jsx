
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "../services/auth-service";
import { login, logout } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import Signup from "../components/Signup";
import SigninTest from "../components/SigninTest";
import PageNotFound from "../components/PageNotFound";
import {  Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Private from "./private";
import Public from "./public";
import Dashboard from "../components/Dashboard/Dashboard";
import AllUser from "../components/User/AllUser";
import EditUser from "../components/User/EditUser";
import AllRoles from "../components/Role/AllRoles";
import EditRole from "../components/Role/EditRole";
import Logs from "../components/Logs/Logs";
import UserProfile from "../components/auth/UserProfile";
import ForgetPassword from "../components/auth/ForgetPassword";
import ResetPassword from "../components/auth/ResetPassword";
import AllEmails from "../components/Email/AllEmails";
import EditEmail from "../components/Email/EditEmail";
import GeneralSettings from "../components/GeneralSettings/GeneralSettings";
import Security from "../components/GeneralSettings/Security";
import AdminMedia from "../components/GeneralSettings/AdminMedia";
import EmailSetting from "../components/GeneralSettings/EmailSetting";
import TestMail from "../components/GeneralSettings/TestMail";

function LogsAccess() {
  const navigate = useNavigate();
  const { permissions } = useSelector((state) => state?.auth);

  useEffect(() => {
    const hasLogsPermission = permissions.includes("logs");

    if (!hasLogsPermission) {
      // Redirect to the home page if the user doesn't have the "logs" permission
      navigate("/");
    }
  }, [permissions, navigate]);

  return <>{permissions.includes("logs") && <Outlet />}</>;
}

function UsersAccess() {
  const navigate = useNavigate();
  const { permissions } = useSelector((state) => state?.auth);

  useEffect(() => {
    const hasLogsPermission = permissions.includes("users");

    if (!hasLogsPermission) {
      // Redirect to the home page if the user doesn't have the "logs" permission
      navigate("/");
    }
  }, [permissions, navigate]);

  return <>{permissions.includes("users") && <Outlet />}</>;
}

function RolesAccess() {
  const navigate = useNavigate();
  const { permissions } = useSelector((state) => state?.auth);

  useEffect(() => {
    const hasLogsPermission = permissions.includes("roles");

    if (!hasLogsPermission) {
      // Redirect to the home page if the user doesn't have the "logs" permission
      navigate("/");
    }
  }, [permissions, navigate]);

  return <>{permissions.includes("roles") && <Outlet />}</>;
}

function EmailAccess() {
  const navigate = useNavigate();
  const { permissions } = useSelector((state) => state?.auth);

  useEffect(() => {
    const hasLogsPermission = permissions.includes("emails");

    if (!hasLogsPermission) {
      // Redirect to the home page if the user doesn't have the "logs" permission
      navigate("/");
    }
  }, [permissions, navigate]);

  return <>{permissions.includes("emails") && <Outlet />}</>;
}

function GeneralSettingsAccess() {
  const navigate = useNavigate();
  const { permissions } = useSelector((state) => state?.auth);

  useEffect(() => {
    const hasLogsPermission = permissions.includes("general_settings");

    if (!hasLogsPermission) {
      // Redirect to the home page if the user doesn't have the "logs" permission
      navigate("/");
    }
  }, [permissions, navigate]);

  return <>{permissions.includes("general_settings") && <Outlet />}</>;
}


function Home() {
  return (
    <>
      <h1>Welcome , </h1>
    </>
  );
}

function index() {
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  function getProfile(token) {
    Profile(token)
      .then((res) => {
        dispatch(login(res.data.data));
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
        dispatch(logout());
        localStorage.removeItem("token");
      });
  }

  useEffect(() => {
    if (token) {
      getProfile(token);
    }
  }, []);

  return (
    <div>
      {user === "" && !user && user === null && <Header />}
      <Routes>
        <Route path="/" element={<Private />}>
          <Route path="/" element={<HomePage />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<UserProfile />} />

              {/* <Route path="/" element={<UsersAccess />}> */}
                <Route path="/users" element={<AllUser />} />
                <Route path="/add-user" element={<EditUser />} />
                <Route path="/edit-user/:id" element={<EditUser />} />
              {/* </Route> */}

              {/* <Route path="/" element={<RolesAccess />}> */}
                <Route path="/roles" element={<AllRoles />} />
                <Route path="/add-role" element={<EditRole />} />
                <Route path="/edit-role/:id" element={<EditRole />} />
              {/* </Route> */}

              {/* <Route path="/" element={<EmailAccess />}> */}
                <Route path="/emails" element={<AllEmails />} />
                <Route path="/add-email" element={<EditEmail />} />
                <Route path="/edit-email/:id" element={<EditEmail />} />
              {/* </Route> */}

              {/* <Route path="/" element={<GeneralSettingsAccess />}> */}
                <Route path="/general-settings" element={<GeneralSettings />}>
                  <Route path="security" element={<Security />} />
                  <Route path="admin" element={<AdminMedia />} />
                  <Route path="email-setting" element={<EmailSetting />} />
                  <Route path="test-mail" element={<TestMail />} />
                {/* </Route> */}
              </Route>

              {/* <Route path="/" element={<LogsAccess />}> */}
                <Route path="/logs" element={<Logs />} />
              {/* </Route> */}
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Public />}>
          <Route path="/signin" element={<SigninTest />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default index;
