import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  createEmail,
  getEmail,
  updateEmail,
} from "../../services/email-service";
import {  useFormik } from "formik";
import toast from "react-hot-toast";

function EditEmail() {
  const { id } = useParams();
  const [ setEditorContent] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      subject: "",
      content: "",
      mailtags: "",
      is_active: false,
    },
    onSubmit: (values) => {
      const { name, subject, content, mailtags, is_active } = values;
      const data = {
        email: {
          name,
          subject,
          content,
          mailtags,
          is_active,
        },
      };
      if (id) {
        updateEmail(id, data)
          .then((res) => {
            if (res.data) {
              navigate("/emails");
            }
          })
          .catch((e) => {
            toast.error(e?.response?.data.message);
          });
      } else {
        createEmail(data)
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            navigate("/emails");
          })
          .catch((e) => {
            toast.error(e?.response?.data.message);
          });
      }
    },
  });

  useEffect(() => {
    if (id) {
      getEmail(id)
        .then((res) => {
          formik.setValues({
            name: res.data.name || "",
            subject: res.data.subject || "",
            content: res.data.content || "",
            mailtags: res.data.mailtags || "",
            is_active: res.data.is_active || false,
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
        <div className="mt-10 sm:mx-auto sm:w-full  w-full">
          <div className="bg-white  px-2 py-6 shadow sm:rounded-lg sm:px-12 ">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="flex gap-10">
                <div className="w-full flex-col mt-4">
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
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="block p-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {/* {formik.errors.name && formik.touched.name ? (
                    <p className="text-red-500">{formik.errors.name}</p>
                  ) : null} */}
                    </div>
                  </div>

                  {/* subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block mt-4 text-sm font-medium leading-6 text-gray-900"
                    >
                      Subject
                    </label>
                    <div>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* mailtags */}
                  <div>
                    <label
                      htmlFor="mailtags"
                      className="block mt-4 text-sm font-medium leading-6 text-gray-900"
                    >
                      mailtags
                    </label>
                    <div>
                      <input
                        id="mailtags"
                        name="mailtags"
                        type="text"
                        value={formik.values.mailtags}
                        onChange={formik.handleChange}
                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* Active */}
                  <div className="flex mt-4 gap-4">
                    <label
                      htmlFor="is_active"
                      className="block  text-sm font-medium leading-6 text-gray-900"
                    >
                      Active
                    </label>
                    <div>
                      <input
                        name="is_active"
                        type="checkbox"
                        id="is_active"
                        checked={formik.values.is_active}
                        onChange={(e) =>
                          formik.setFieldValue("is_active", e.target.checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  {/* content */}
                  <div>
                    <label
                      htmlFor="content"
                      className="block mt-4 text-sm font-medium leading-6 text-gray-900"
                    >
                      content
                    </label>
                    <div>
                      <CKEditor
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        editor={ClassicEditor}
                        data={formik.values.content}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setEditorContent(data);
                          formik.setFieldValue("content", data);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {id ? "Update email " : "Add email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEmail;
