import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { createOrUpdateSetting } from "../../services/setting-service";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../../redux/slices/settingSlice";
import Spinner from "../../helper/Spinner";

function Security() {
  const { setting } = useSelector((state) => state?.setting);
  const settingId = localStorage.getItem("setting_id");
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password_expire_value: 4,
      password_expire_unit: "Months",
      session_expire_value: 4,
      session_expire_unit: "Days",
      password_link_expire_value: 4,
      password_link_expire_unit: "Days",
    },
    onSubmit: async (values) => {
      setLoading(true);
      setShowSpinner(true);
      try {
        const formData = new FormData();
        formData.append("password_expire_value", values.password_expire_value);
        formData.append("password_expire_unit", values.password_expire_unit);
        formData.append("session_expire_value", values.session_expire_value);
        formData.append("session_expire_unit", values.session_expire_unit);
        formData.append(
          "password_link_expire_value",
          values.password_link_expire_value
        );
        formData.append(
          "password_link_expire_unit",
          values.password_link_expire_unit
        );

        if (settingId) formData.append("_id", setting._id);
        createOrUpdateSetting(formData)
          .then((res) => {
            dispatch(getSetting(res?.data));
            localStorage.setItem("setting_id", res.data._id);
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
        password_expire_value: setting.password_expire_value,
        password_expire_unit: setting.password_expire_unit,
        session_expire_value: setting.session_expire_value,
        session_expire_unit: setting.session_expire_unit,
        password_link_expire_value: setting.password_link_expire_value,
        password_link_expire_unit: setting.password_link_expire_unit,
      });
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {showSpinner && <Spinner />}
      <form onSubmit={formik.handleSubmit}>
        {/* header */}
        <div className="flex justify-between items-center bg-slate-50 p-3 h-fit rounded-md">
          <h1 className="text-lg font-semibold">Security</h1>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[#12BDB5] hover:bg-[#369590f0] p-2 rounded-md font-semibold"
            >
              Save changes
            </button>
            <button className="bg-[#E4E6EF] hover:bg-[#d7d8e0] p-2 rounded-md font-semibold">
              Cancel
            </button>
          </div>
        </div>

        <hr />

        {/* Use flex-grow to make the following div take up remaining space */}

        <div className="flex-grow bg-slate-50 p-3 rounded-md">
          <div className="mt-16 ">
            <h1 className="text-md font-semibold">
              Configure setting passwords to expire periodically
            </h1>
            <div>
              <div className="flex gap-32 mt-4 items-center">
                <span>Expier Every:</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="p-2 rounded-md bg-slate-200 font-semibold"
                    name="password_expire_value"
                    onChange={formik.handleChange}
                    value={formik.values.password_expire_value}
                  />
                  <select
                    name="password_expire_unit"
                    onChange={formik.handleChange}
                    value={formik.values.password_expire_unit}
                    className="p-2 rounded-md bg-slate-200 font-semibold"
                  >
                    <option value="Months">Months</option>
                    <option value="Years">Years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 ">
            <h1 className="text-md font-semibold">Remember session:</h1>
            <div>
              <div className="flex gap-16 mt-4 items-center">
                <span>Remember time-out:</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="p-2 rounded-md bg-slate-200 font-semibold"
                    name="session_expire_value"
                    onChange={formik.handleChange}
                    value={formik.values.session_expire_value}
                  />
                  <select
                    name="session_expire_unit"
                    onChange={formik.handleChange}
                    value={formik.values.session_expire_unit}
                    className="p-2 rounded-md bg-slate-200 font-semibold"
                  >
                    <option value="Days">Days</option>
                    <option value="Hours">Hours</option>
                    <option value="Minutes">Minutes</option>
                    <option value="Months">Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 ">
            <h1 className="text-md font-semibold">
              Validity of link new password / password forgotten:
            </h1>
            <div>
              <div className="flex gap-16 mt-4 items-center">
                <span>Remember time-out:</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="p-2 rounded-md bg-slate-200 font-semibold"
                    name="password_link_expire_value"
                    onChange={formik.handleChange}
                    value={formik.values.password_link_expire_value}
                  />
                  <select
                    name="password_link_expire_unit"
                    onChange={formik.handleChange}
                    value={formik.values.password_link_expire_unit}
                    className="p-2 rounded-md bg-slate-200 font-semibold"
                  >
                    <option value="Days">Days</option>
                    <option value="Hours">Hours</option>
                    <option value="Minutes">Minutes</option>
                    <option value="Months">Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Security;
