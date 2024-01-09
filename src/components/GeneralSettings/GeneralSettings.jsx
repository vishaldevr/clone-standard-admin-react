import React, {  useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
function GeneralSettings() {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <div className="flex gap-5">
        <div className="h-[80vh] w-60 bg-slate-100 rounded-md p-3">
          <ul>
            <Link to={"security"} onClick={() => handleLinkClick("/")}>
              <li
                className={`bg-slate-200 mt-2 font-semibold pt-3 pb-3 pr-2 pl-2 rounded-lg cursor-pointer ${
                  activeLink === "/" && "bg-yellow-100"
                }`}
              >
                <div className="flex gap-5 items-center">
                  <FaUser className="mt-1 text-xl" />
                  <span>Security</span>
                </div>
              </li>
            </Link>
            <Link to={"admin"} onClick={() => handleLinkClick("/admin")}>
              <li
                className={`bg-slate-200 mt-2 font-semibold pt-3 pb-3 pr-2 pl-2 rounded-lg cursor-pointer ${
                  activeLink === "/admin" && "bg-yellow-100"
                }`}
              >
                <div className="flex gap-5 items-center">
                  <FaUser className="mt-1 text-xl" />
                  <span>Admin Media</span>
                </div>
              </li>
            </Link>
            <Link
              to={"email-setting"}
              onClick={() => handleLinkClick("/email-setting")}
            >
              <li
                className={`bg-slate-200 mt-2 font-semibold pt-3 pb-3 pr-2 pl-2 rounded-lg cursor-pointer ${
                  activeLink === "/email-setting" && "bg-yellow-100"
                }`}
              >
                <div className="flex gap-5 items-center">
                  <MdEmail className="mt-1 text-xl" />
                  <span>Email Setting</span>
                </div>
              </li>
            </Link>
            <Link
              to={"test-mail"}
              onClick={() => handleLinkClick("/test-mail")}
            >
              <li
                className={`bg-slate-200 mt-2 font-semibold pt-3 pb-3 pr-2 pl-2 rounded-lg cursor-pointer ${
                  activeLink === "/test-mail" && "bg-yellow-100"
                }`}
              >
                <div className="flex gap-5 items-center">
                  <MdEmail className="mt-1 text-xl" />
                  <span>Test Mail</span>
                </div>
              </li>
            </Link>
          </ul>
        </div>

        <div className="h-[80vh] w-full bg-slate-100 rounded-md p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default GeneralSettings;
