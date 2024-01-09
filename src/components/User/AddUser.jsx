import {  useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { CreateUserSchema } from "../../schemas/CreateUserSchema";
import { CreateUsers } from "../../services/user-service";
import React from "react";
import toast from "react-hot-toast";
const AddUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone_no: "",
    },
    validationSchema: CreateUserSchema,
    onSubmit: (values) => {
      const { name, email, password, phone_no } = values;
      const data = {
        name,
        email,
        password,
        phone_no,
      };
      CreateUsers(token,data)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          navigate("/users");
        })
        .catch((e) => {
          toast.error(e?.response?.data.message);
        });
    },
  });
  return (
    <>
    <div className="border-2 rounded-lg p-2 w-fit cursor-pointer" onClick={()=>navigate(-1)}>BACK</div>
      <div className="flex  min-h-full flex-1 flex-col justify-center  sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white  px-6 py-12 shadow sm:rounded-lg sm:px-12 ">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              {/* name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <p className="text-red-500">{formik.errors.name}</p>
                  ) : null}
                </div>
              </div>
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p className="text-red-500">{formik.errors.password}</p>
                  ) : null}
                </div>
              </div>
              {/* phone no */}

              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="phone_no"
                    className="block  text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone no
                  </label>
                </div>
                <div>
                  <input
                    id="phone_no"
                    name="phone_no"
                    type="phone_no"
                    value={formik.values.phone_no}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.phone_no && formik.touched.phone_no ? (
                    <p className="text-red-500">{formik.errors.phone_no}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
