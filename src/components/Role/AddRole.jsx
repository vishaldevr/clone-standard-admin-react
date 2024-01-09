import {  useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { CreateRole } from "../../services/role-service";
import { CreateRoleSchema } from "../../schemas/CreateRoleSchema";
import React from "react";
import toast from "react-hot-toast";
const AddRole = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: CreateRoleSchema,
    onSubmit: (values) => {
      const { name } = values;
      const data = {
        "role": {
          "name":name
        }
      };
      CreateRole(token, data)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          navigate("/roles");
        })
        .catch((e) => {
          toast.error(e?.response?.data.message);
        });
    },
  });
  return (
    <>
      <div
        className="border-2 rounded-lg p-2 w-fit cursor-pointer"
        onClick={() => navigate(-1)}
      >
        BACK
      </div>
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
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Role
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRole;
