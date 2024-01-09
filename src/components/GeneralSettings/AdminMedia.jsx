import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaImage, FaRegUserCircle } from "react-icons/fa";
import { createOrUpdateSetting } from "../../services/setting-service";
import { useDispatch, useSelector } from "react-redux";
import { changeLogo, getSetting } from "../../redux/slices/settingSlice";
import Spinner from "../../helper/Spinner";
import toast from "react-hot-toast";
function AdminMedia() {
  const { setting } = useSelector((state) => state?.setting);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [previewImageCompany, setpreviewImageCompany] = useState("");
  const [previewImageBackground, setpreviewImageBackground] = useState("");

  function getImageCompany(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    formik.setValues({
      ...formik.values,
      logo: uploadedImage,
    });

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);

      fileReader.onload = function () {
        setpreviewImageCompany(fileReader.result);
      };
    }
  }

  function getImageBackground(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    formik.setValues({
      ...formik.values,
      background: uploadedImage,
    });
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);

      fileReader.onload = function () {
        setpreviewImageBackground(fileReader.result);
      };
    }
  }

  const formik = useFormik({
    initialValues: {
      // add value
      logo: null,
      background: null,
    },
    onSubmit: async (values) => {
      setLoading(true);
      setShowSpinner(true);
      try {
        const formData = new FormData();
        formData.append("logo", values.logo);
        formData.append("background", values.background);
        if (setting && setting._id) formData.append("_id", setting._id);

        createOrUpdateSetting(formData)
          .then((res) => {
            let logo = `http://localhost:5000/${res.data.logo.replace(
              /\\/g,
              "/"
            )}`;
            dispatch(changeLogo(logo));
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
      if (setting.logo) {
        let logo = `http://localhost:5000/${setting.logo.replace(/\\/g, "/")}`;
        setpreviewImageCompany(logo);
        dispatch(changeLogo(logo));
        formik.setValues({
          ...formik.values,
          logo,
        });
      }
      if (setting.background) {
        let background = `http://localhost:5000/${setting.background.replace(
          /\\/g,
          "/"
        )}`;
        setpreviewImageBackground(background);
        formik.setValues({
          ...formik.values,
          background,
        });
      }
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
            <h1 className="text-lg font-semibold">Admin Media</h1>
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
            <label htmlFor="logo" className="cursor-pointer">
              {previewImageCompany ? (
                <>
                  <div className="flex gap-20 mt-10">
                    <h1 className="font-semibold text-md">Company Logo</h1>
                    <div>
                      <div
                        className="rounded-md flex justify-center items-center bg-[#d7d8e0]"
                        style={{
                          width: "150px",
                          height: "150px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          style={{
                            width: "150px",
                            height: "150px",
                            border: "1px solid black",
                          }}
                          src={previewImageCompany}
                          alt="previewImageCompany"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex gap-20 mt-10">
                  <h1 className="font-semibold text-md">Company Logo</h1>
                  <div>
                    <div
                      className="rounded-md flex justify-center items-center bg-[#d7d8e0]"
                      style={{
                        width: "150px",
                        height: "150px",
                        overflow: "hidden",
                      }}
                    >
                      <FaRegUserCircle className="text-[130px]" />
                    </div>
                  </div>
                </div>
              )}
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              id="logo"
              name="logo"
              accept=".jpg, .jpeg, .png, .svg"
              onChange={getImageCompany}
            />

            <label htmlFor="background" className="cursor-pointer">
              {previewImageBackground ? (
                <>
                  <div className="flex gap-[101px] mt-10">
                    <h1 className="font-semibold text-md">Background</h1>
                    <div>
                      <div
                        className="rounded-md flex justify-center items-center bg-[#d7d8e0]"
                        style={{
                          width: "150px",
                          height: "150px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          style={{
                            width: "150px",
                            height: "150px",
                            border: "1px solid black",
                          }}
                          src={previewImageBackground}
                          alt="previewImageBackground"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex  gap-[101px] mt-10 ">
                  <h1 className="font-semibold text-md">Background</h1>
                  <div>
                    <div
                      className="rounded-md flex justify-center items-center bg-[#d7d8e0]"
                      style={{
                        width: "150px",
                        height: "150px",
                        overflow: "hidden",
                      }}
                    >
                      <FaImage className="text-[130px]" />
                    </div>
                  </div>
                </div>
              )}
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              id="background"
              name="background"
              accept=".jpg, .jpeg, .png, .svg"
              onChange={getImageBackground}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default AdminMedia;
