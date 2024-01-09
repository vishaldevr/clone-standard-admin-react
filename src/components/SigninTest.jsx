import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginUser } from "../services/auth-service";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { LoginSchemas } from "../schemas/LoginSchemas";
import React,{ useState } from "react";
import Spinner from "../helper/Spinner";

const SigninTest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchemas,
    onSubmit: (values) => {
      setLoading(true);
      setShowSpinner(true);
      const { email, password } = values;
      const data = {
        email,
        password,
      };

      LoginUser(data)
        .then((res) => {
          toast.success(res.data?.message);
          dispatch(login(res.data.result));
          localStorage.setItem("token", res.data.token);
          navigate("/");
        })
        .catch((e) => {
          toast.error(e?.response?.data.message);
        })
        .finally(() => {
          setLoading(false);
          setShowSpinner(false);
        });
    },
  });
  return (
    <>
      {showSpinner && <Spinner />}
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white  px-6 py-12 shadow sm:rounded-lg sm:px-12 ">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              {/* email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="text-red-500">{formik.errors.email}</p>
                  ) : null}
                </div>
              </div>
              {/* Password */}

              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block  text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <Link to="/forget-password">
                    <span className="font-semibold text-blue-700 cursor-pointer">
                      Forget password ?
                    </span>
                  </Link>
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p className="text-red-500">{formik.errors.password}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            New user please register ?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SigninTest;
