import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import {  ResetPasswordApi } from "../../services/auth-service";
import toast from "react-hot-toast";
import Spinner from "../../helper/Spinner";
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  function handleForgotPassword(event) {
    event.preventDefault();
    setLoading(true);
    setShowSpinner(true);
    if (!token) return;
    ResetPasswordApi(token, { password })
      .then((res) => {
        toast.success(res?.data?.message);
        navigate("/signin");
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      })
      .finally(() => {
        setLoading(false);
        setShowSpinner(false);
      });
  }

  return (
    <>
      {showSpinner && <Spinner />}
      <div>
        <div className="flex overflow-x-auto items-center justify-center h-[90vh]">
          <form
            noValidate
            onSubmit={handleForgotPassword}
            className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 shadow-[0_0_2px_black]"
          >
            <div className="flex gap-1 items-center">
              <button
                onClick={() => navigate("/signin")}
                className=" w-fit p-1 rounded-lg mt-1"
              >
                <IoChevronBackOutline />
              </button>
              <h1 className="text-center text-2xl font-bold">Reset password</h1>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold">
                Enter new password
              </label>
              <input
                className="bg-transparent px-2 py-1 border"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-blue-500 hover:bg-blue-400 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            >
              Reset Password
            </button>
            <p className="mt-2 text-center text-sm text-gray-500">
              Back to login ?{" "}
              <Link
                to="/signin"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
