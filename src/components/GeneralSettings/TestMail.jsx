import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { sendTestMail } from "../../services/setting-service";
import toast from "react-hot-toast";

function TestMail() {
  const [email, setEmail] = useState("");
  const id = localStorage.getItem("setting_id");
  function handleSubmit() {
    sendTestMail({ email, id })
      .then((res) => {
        console.log("res: ", res);
        // toast.error();
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  }
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* header */}
        <div className="flex justify-between items-center bg-slate-50 p-3 h-fit rounded-md">
          <h1 className="text-lg font-semibold">Test Mail</h1>
          <div className="flex gap-2">
            <button
              onClick={() => handleSubmit()}
              className="bg-[#12BDB5] hover:bg-[#369590f0] p-2 rounded-md font-semibold"
            >
              Save changes
            </button>
            <button className="bg-[#E4E6EF] hover.bg-[#d7d8e0] p-2 rounded-md font-semibold">
              Cancel
            </button>
          </div>
        </div>

        <hr />

        {/* Use flex-grow to make the following div take up remaining space */}
        <div className="flex-grow bg-slate-50 p-3 rounded-md">
          <div className="mt-8 flex items-center ml-10 gap-28">
            <span className="text-md font-semibold ">E-mail send from *</span>
            {/* Email icon and Input field container */}
            <div className="flex items-center bg-slate-200 rounded-md p-2">
              <MdEmail className="text-3xl mr-2" />
              <input
                type="text"
                className="p-2 w-96 bg-transparent rounded-md outline-none"
                placeholder="E-mail send from *"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestMail;
