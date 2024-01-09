import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { createOrUpdateSetting } from "../../services/setting-service";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../../redux/slices/settingSlice";
import Spinner from "../../helper/Spinner";

function EmailSetting() {
  const { setting } = useSelector((state) => state?.setting);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      sender_name: "",
      smtp_server: "",
      smtp_port: "",
      smtp_user: "",
      is_user_password_to_configure: "",
      is_remember_session_to_configure: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      setShowSpinner(true);
      try {
        const formData = new FormData();
        formData.append("sender_name", values.sender_name);
        formData.append("smtp_server", values.smtp_server);
        formData.append("smtp_port", values.smtp_port);
        formData.append("smtp_user", values.smtp_user);
        formData.append(
          "is_user_password_to_configure",
          values.is_user_password_to_configure
        );
        formData.append(
          "is_remember_session_to_configure",
          values.is_remember_session_to_configure
        );

        if (setting && setting._id) formData.append("_id", setting._id);

        createOrUpdateSetting(formData)
          .then((res) => {
            dispatch(getSetting(res?.data));
          })
          .catch((e) => {
            toast.error(e?.response?.data.message);
          })
          .finally(() => {
            setLoading(false);
            setShowSpinner(false);
          });
        // You need to send the form data to your backend here
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  useEffect(() => {
    if (setting) {
      formik.setValues({
        ...formik.values,
        sender_name: setting.sender_name,
        smtp_server: setting.smtp_server,
        smtp_port: setting.smtp_port,
        session_expire_unit: setting.session_expire_unit,
        smtp_user: setting.smtp_user,
        is_user_password_to_configure: setting.is_user_password_to_configure,
        is_remember_session_to_configure:
          setting.is_remember_session_to_configure,
      });
    }
  }, []);

  return (
    <>
      {showSpinner && <Spinner />}
      <form onSubmit={formik.handleSubmit}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* header */}
          <div className="flex justify-between items-center bg-slate-50 p-3 h-fit rounded-md">
            <h1 className="text-lg font-semibold">Email Setting</h1>
            <div className="flex gap-2">
              <button className="bg-[#12BDB5] hover:bg-[#369590f0] p-2 rounded-md font-semibold">
                Save changes
              </button>
              <button className="bg-[#E4E6EF] hover:bg-[#d7d8e0] p-2 rounded-md font-semibold">
                Cancel
              </button>
            </div>
          </div>

          <hr />

          {/* Use flex-grow to make the following div take up remaining space */}
          <div className="flex-grow bg-slate-50 p-3 rounded-md ">
            <div className="mt-2 flex items-center  gap-[116px] ml-10">
              <span className="text-md font-semibold ">
                E-mail send from <span className="text-red-600">*</span>
              </span>
              <div className="flex items-center bg-slate-200 rounded-md p-2">
                <MdEmail className="text-2xl mr-2" />
                <input
                  type="text"
                  className=" w-[20.9rem] bg-transparent rounded-md outline-none"
                  placeholder="E-mail send from *"
                  name="sender_name"
                  onChange={formik.handleChange}
                  value={formik.values.sender_name}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center  gap-[146px] ml-10">
              <span className="text-md font-semibold ">
                SMTP server <span className="text-red-600">*</span>
              </span>
              <input
                type="text"
                className="p-2 w-96 bg-slate-200 rounded-md"
                placeholder="SMTP server *"
                name="smtp_server"
                onChange={formik.handleChange}
                value={formik.values.smtp_server}
              />
            </div>

            <div className="mt-8 flex items-center  gap-40 ml-10">
              <span className="text-md font-semibold ">
                SMTP port <span className="text-red-600">*</span>
              </span>
              <input
                type="text"
                className="p-2 w-96 bg-slate-200 rounded-md"
                placeholder="SMTP port *"
                name="smtp_port"
                onChange={formik.handleChange}
                value={formik.values.smtp_port}
              />
            </div>

            <div className="mt-8 flex items-center  gap-40 ml-10">
              <span className="text-md font-semibold ">
                SMTP user <span className="text-red-600">*</span>
              </span>
              <input
                type="text"
                className="p-2 w-96 bg-slate-200 rounded-md"
                placeholder="SMTP user *"
                name="smtp_user"
                onChange={formik.handleChange}
                value={formik.values.smtp_user}
              />
            </div>

            <div className="mt-8 flex items-center  gap-[122px] ml-10">
              <span className="text-md font-semibold ">
                SMTP password <span className="text-red-600">*</span>
              </span>
              <input
                type="text"
                className="p-2 w-96 bg-slate-200 rounded-md"
                placeholder="SMTP password *"
                name="is_user_password_to_configure"
                onChange={formik.handleChange}
                value={formik.values.is_user_password_to_configure}
              />
            </div>

            <div className="mt-8 flex items-center  gap-24 ml-10">
              <span className="text-md font-semibold ">
                SMTP security type <span className="text-red-600">*</span>
              </span>
              <select
                name="is_remember_session_to_configure"
                onChange={formik.handleChange}
                value={formik.values.is_remember_session_to_configure}
                className="p-2 rounded-md bg-slate-200 font-semibold w-96"
              >
                <option value="TLS">TLS</option>
                <option value="SSL">SSL</option>
                <option value="STARTTLS">STARTTLS</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EmailSetting;
