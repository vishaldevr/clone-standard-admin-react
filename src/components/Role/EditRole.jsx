import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { CreateRole, GetRole, UpdateRole } from "../../services/role-service";
import toast from "react-hot-toast";
function EditRole() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      is_active: false,
      permission: [],
    },
    onSubmit: (values) => {
      const { name, is_active, permission } = values;
      const data = {
        role: {
          name: name,
          is_active,
          permission,
        },
      };
      if (id) {
        UpdateRole(token, id, data)
          .then((res) => {
            if (res.data) {
              navigate("/roles");
            }
          })
          .catch((e) => {
            toast.error(e?.response?.data.message);
          });
      } else {
        CreateRole(token, data)
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            navigate("/roles");
          })
          .catch((e) => {
            toast.error(e?.response?.data.message);
          });
      }
    },
  });

  function handlePermission(permissionType) {
    const isPermissionChecked =
      formik.values.permission.includes(permissionType);

    if (isPermissionChecked) {
      // If permission is already in the array, remove it
      formik.setFieldValue(
        "permission",
        formik.values.permission.filter(
          (permission) => permission !== permissionType
        )
      );
    } else {
      // If permission is not in the array, add it
      formik.setFieldValue("permission", [
        ...formik.values.permission,
        permissionType,
      ]);
    }
  }

  useEffect(() => {
    if (token && id) {
      GetRole(token, id)
        .then((res) => {
          formik.setValues({
            name: res.data.name || "",
            is_active: res.data.is_active || false,
            permission: res.data.permission || [],
          });
        })
        .catch((e) => {
          toast.error(e?.response?.data.message);
        });
    }
  }, []);

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
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <p className="text-red-500">{formik.errors.name}</p>
                  ) : null}
                </div>
              </div>
              {/* Active */}
              <div className="flex gap-4">
                <label
                  htmlFor="is_active"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Active
                </label>
                <div>
                  <input
                    id="is_active"
                    name="is_active"
                    type="checkbox"
                    checked={formik.values.is_active}
                    onChange={(e) =>
                      formik.setFieldValue("is_active", e.target.checked)
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <h1>Permission : </h1>
                </div>
                <div>
                  {/* user */}
                  <div className="flex gap-4">
                    <div>
                      <input
                        id="users"
                        name="users"
                        type="checkbox"
                        checked={formik.values.permission.includes("users")}
                        onChange={() => handlePermission("users")}
                      />
                    </div>
                    <label
                      htmlFor="users"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Users
                    </label>
                  </div>

                  {/* logs */}
                  <div className="flex gap-4">
                    <div>
                      <input
                        id="logs"
                        name="logs"
                        type="checkbox"
                        checked={formik.values.permission.includes("logs")}
                        onChange={() => handlePermission("logs")}
                      />
                    </div>
                    <label
                      htmlFor="logs"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Logs
                    </label>
                  </div>

                  {/* dashboard */}
                  <div className="flex gap-4">
                    <div>
                      <input
                        id="dashboard"
                        name="dashboard"
                        type="checkbox"
                        checked={formik.values.permission.includes("dashboard")}
                        onChange={() => handlePermission("dashboard")}
                      />
                    </div>
                    <label
                      htmlFor="dashboard"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Dashboard
                    </label>
                  </div>
                  {/* roles */}
                  <div className="flex gap-4">
                    <div>
                      <input
                        id="roles"
                        name="roles"
                        type="checkbox"
                        checked={formik.values.permission.includes("roles")}
                        onChange={() => handlePermission("roles")}
                      />
                    </div>
                    <label
                      htmlFor="roles"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Roles
                    </label>
                  </div>
                  {/* Emails */}
                  <div className="flex gap-4">
                    <div>
                      <input
                        id="emails"
                        name="Emails"
                        type="checkbox"
                        checked={formik.values.permission.includes("emails")}
                        onChange={() => handlePermission("emails")}
                      />
                    </div>
                    <label
                      htmlFor="emails"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Emails
                    </label>
                  </div>
                  {/* general_settings */}
                  <div className="flex gap-4">
                    <div>
                      <input
                        id="general_settings"
                        name="general_settings"
                        type="checkbox"
                        checked={formik.values.permission.includes(
                          "general_settings"
                        )}
                        onChange={() => handlePermission("general_settings")}
                      />
                    </div>
                    <label
                      htmlFor="eneral_settings"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      General settings
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {id ? "Update Role " : "Add role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditRole;
