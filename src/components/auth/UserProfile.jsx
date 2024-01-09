import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateLoginUser } from "../../services/auth-service";
import { login } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import Spinner from "../../helper/Spinner";

function UserProfile() {
  const [userImage, setUserImage] = useState("");
  const [data, setData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading,  setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const token = localStorage.getItem("token");
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const dispatch = useDispatch();
  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);

      fileReader.onload = function () {
        setUserImage(fileReader.result);
      };

      setData({
        ...data,
        avatar: uploadedImage,
      });
    }
  }

  function handleUpdateUser() {
    setLoading(true);
    setShowSpinner(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("email", data.email);
    formDataToSend.append("password", data.password);
    formDataToSend.append("phone_no", data.phone_no);

    if (data.avatar) {
      formDataToSend.append("avatar", data.avatar);
    }

    UpdateLoginUser(token, formDataToSend)
      .then((res) => {
        dispatch(login(res.data.data));
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      })
      .finally(() => {
        setLoading(false);
        setShowSpinner(false);
      });
  }

  useEffect(() => {
    setData(user);
    if (user?.avatar) {
      let path = `http://localhost:5000/${user.avatar.replace(/\\/g, "/")}`;
      setUserImage(path);
    } else
      setUserImage(
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      );
  }, [user]);

  return (
    <div>
      {showSpinner && (
       <Spinner />
      )}

      <div>
        <div className="flex gap-8  p-4 w-full h-full justify-center items-center">
          <div>
            <label htmlFor="image_uploads">
              <img
                id="img"
                className="w-44 h-44 rounded-md border-4 cursor-pointer"
                src={userImage}
                alt="User Image"
              />
            </label>
            <input
              id="image_uploads"
              accept=".jpg, .jpeg, .png, .svg"
              onChange={getImage}
              name="avatar"
              type="file"
              className="hidden"
            />
          </div>

          <div className=" w-fit p-4 border-4 rounded-md">
            <div className="flex gap-32">
              <div>
                <span>Name :</span>{" "}
                <input
                  className="bg-slate-200 p-2 rounded-md font-semibold"
                  name="name"
                  value={data?.name}
                  onChange={onChange}
                />
              </div>
              <div>
                <span>Email :</span>{" "}
                <input
                  type="email"
                  name="email"
                  className="bg-slate-200 p-2 rounded-md font-semibold"
                  value={data?.email}
                  onChange={onChange}
                  disabled
                />
              </div>
            </div>

            <div className="flex gap-20 mt-16">
              <div>
                <span>Phone no:</span>{" "}
                <input
                  name="phone_no"
                  className="bg-slate-200 p-2 rounded-md font-semibold"
                  value={data?.phone_no}
                  onChange={onChange}
                />
              </div>
              <div>
                <span>Password :</span>{" "}
                <input
                  name="password"
                  className="bg-slate-200 p-2 rounded-md font-semibold"
                  onChange={onChange}
                />
              </div>
              <div className="ml-1">
                <button
                  onClick={() => handleUpdateUser()}
                  className="bg-slate-300 p-2 rounded-md font-semibold hover:bg-red-300 transition-all"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
