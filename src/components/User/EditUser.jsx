import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateUsers, GetUser, UpdateUser } from "../../services/user-service";
import { useFormik } from "formik";
import { CreateUserSchema } from "../../schemas/CreateUserSchema";
import toast from "react-hot-toast";
import { AllRoles } from "../../services/role-service";
import { useDispatch } from "react-redux";
import { allPermissions } from "../../redux/slices/authSlice";
import { GetPermissions } from "../../services/auth-service";
function EditUser() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({ avatar: null, roles: [] });

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);

      fileReader.onload = function () {
        setPreviewImage(fileReader.result);
      };

      setFormData({
        ...formData,
        avatar: uploadedImage,
      });
    }
  }

  let validate = !id ? CreateUserSchema : "";

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validate,
    onSubmit: (values) => {
      const { name, email, password, phone_no, roles } = values;
      const data = {
        name,
        email,
        password,
        phone_no,
        roles:roles.map((role) => role._id),
      };
      console.log("data: ", data);
      console.log("roles: ", roles);

      const formDataToSend = new FormData();
      formDataToSend.append("name", data.name);
      formDataToSend.append("email", data.email);
      formDataToSend.append("password", data.password);
      formDataToSend.append("phone_no", data.phone_no);
      // formDataToSend.append("roles", data.roles);
      data.roles.forEach((role) => formDataToSend.append("roles", role));
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }
      if (id) {
        UpdateUser(token, id, formDataToSend)
          .then((res) => {
            if (res.data) {
              GetPermissions(token)
                .then((res) => {
                  console.log("res: sdfsfsdfsd", res);
                  // setPermissions(res?.data?.permissions)
                  dispatch(allPermissions(res?.data?.permissions));
                })
                .catch((e) => {
                  toast.error(e?.response?.data.message);
                });

              navigate("/users");
            }
          })
          .catch((e) => {
            toast.error(e?.response?.data.message);
          });
      } else {
        CreateUsers(token, formDataToSend)
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            navigate("/users");
          })
          .catch((e) => {
            toast.error(e?.response?.data.message);
          });
      }
    },
  });
  function handlePermission(permissionType) {
    const isPermissionChecked = formik.values.roles
      .map((r) => r.name)
      .includes(permissionType);
  
    if (isPermissionChecked) {
      // If permission is already in the array, remove it
      formik.setFieldValue(
        "roles",
        formik.values.roles.filter((permission) => permission.name !== permissionType)
      );
    } else {
      const newRole = roles.filter((r) => r.name === permissionType)[0]; // Use [0] to get the first matching role
      formik.setFieldValue("roles", [...formik.values.roles, newRole]);
    }
  }
  
  useEffect(() => {
    if (token && id) {
      GetUser(token, id)
        .then((res) => {
          console.log("roles need : ", res);
          if (res.data.avatar) {
            let path = `http://localhost:5000/${res.data.avatar.replace(
              /\\/g,
              "/"
            )}`;
            setPreviewImage(path);
          }
          formik.setValues({
            name: res.data.name || "",
            email: res.data.email || "",
            password: "",
            phone_no: res.data.phone_no || "",
            roles: res.data.roles || [],
          });
        })
        .catch((e) => {
          toast.error(e?.response?.data.message);
        });
    }
  }, []);

  useEffect(() => {
    AllRoles(token)
      .then((res) => {
        console.log("res:  all roles", res);
        setRoles(res?.data?.roles);
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
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
        <div className="mt-10 ">
          <div className="bg-white  px-6 py-12 shadow sm:rounded-lg sm:px-12 ">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="flex w-full gap-10">
                <div>
                  <div className="flex-col w-[400px]">
                    {/* Image */}
                    <div className="flex justify-center">
                      <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                          <img
                            style={{
                              width: "250px",
                              height: "250px",
                              borderRadius: "50%",
                              border: "1px solid black",
                            }}
                            src={previewImage}
                            alt="previewImage"
                          />
                        ) : (
                          <div
                            style={{
                              width: "250px",
                              height: "250px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              backgroundColor: "#C1C1C1",
                            }}
                          >
                            <i
                              className="fas fa-image"
                              style={{ fontSize: "150px" }}
                            ></i>
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                        onChange={getImage}
                      />
                    </div>

                    <div className="mt-8 bg-slate-200 p-2 rounded-lg">
                      <div className="flex gap-4">
                        <div>
                          <h1>Permission : </h1>
                        </div>
                        <div>
                          {/* user */}
                          {roles.map((role) => {
                            return (
                              <>
                                {role.is_active && (
                                  <div key={role._id} className="flex gap-4">
                                    <div>
                                      <input
                                        id={role?.name}
                                        name={role?.name}
                                        type="checkbox"
                                        checked={formik.values.roles
                                          .map((r) => r.name)
                                          .includes(`${role?.name}`)}
                                        onChange={() =>
                                          handlePermission(role.name)
                                        }
                                      />
                                    </div>
                                    <label
                                      htmlFor={role?.name}
                                      className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                                    >
                                      {role?.name}
                                    </label>
                                  </div>
                                )}
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full  p-3">
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
                        className="block p-2 mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block p-2 mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block   text-sm font-medium leading-6 text-gray-900"
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
                        className="block p-2 mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block mb-4 w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {formik.errors.phone_no && formik.touched.phone_no ? (
                        <p className="text-red-500">{formik.errors.phone_no}</p>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full mt-8 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {id ? "Edit user" : "Add User"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
