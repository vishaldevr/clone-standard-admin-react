import React,{ Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allPermissions, logout } from "../../redux/slices/authSlice";
import { GetPermissions } from "../../services/auth-service";
import toast from "react-hot-toast";
import {
  getFirstSetting,
  getSettingById,
} from "../../services/setting-service";
import { changeLogo, getSetting } from "../../redux/slices/settingSlice";

const navigation = [
  { name: "Dashboard", to: "/", current: true, permission: "dashboard" },
  { name: "Users", to: "/users", current: false, permission: "users" },
  { name: "Roles", to: "/roles", current: false, permission: "roles" },
  { name: "Logs", to: "/logs", current: false, permission: "logs" },
  { name: "Emails", to: "/emails", current: false, permission: "emails" },
  {
    name: "General-settings",
    to: "/general-settings",
    current: false,
    permission: "general_settings",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const { logo } = useSelector((state) => state?.setting);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const settingId = localStorage.getItem("setting_id");
  function handleDelete() {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/signin");
  }
  const { user } = useSelector((state) => state?.auth);
  const { permissions } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (user?.avatar) {
      let path = `http://localhost:5000/${user.avatar.replace(/\\/g, "/")}`;
      setUserImage(path);
    } else
      setUserImage(
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      );
  }, [user]);

  useEffect(() => {
    GetPermissions(token)
      .then((res) => {
        // setPermissions(res?.data?.permissions)
        dispatch(allPermissions(res?.data?.permissions));
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  }, []);

  useEffect(() => {
    if (settingId) {
      getSettingById(settingId)
        .then((res) => {
          dispatch(getSetting(res?.data));
          if (res.data.logo) {
            let logo = `http://localhost:5000/${res.data.logo.replace(
              /\\/g,
              "/"
            )}`;
            dispatch(changeLogo(logo));
          }

          localStorage.setItem("setting_id", res.data._id);
        })
        .catch((e) => {
          toast.error(e?.response?.data.message);
        });
    } else {
      getFirstSetting()
        .then((res) => {
          dispatch(getSetting(res?.data));
          dispatch(getSetting(res?.data));
          if (res.data.logo) {
            let logo = `http://localhost:5000/${res.data.logo.replace(
              /\\/g,
              "/"
            )}`;
            dispatch(changeLogo(logo));
          }
        })
        .catch((e) => {
          toast.error(e?.response?.data.message);
        });
    }
  }, []);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center justify-center mt-5">
              <img
                className="h-16 rounded-[50%] w-16"
                src={
                  logo ||
                  "https://tailwindui.com/img/logos/mark.svg?color=white"
                }
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation
                      .filter((item) => permissions.includes(item.permission))
                      .map((item, index) => (
                        <>
                          <li key={index}>
                            <Link
                              to={item.to}
                              className={classNames(
                                location.pathname === item.to
                                  ? "bg-indigo-700 text-white"
                                  : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              {item.name}
                            </Link>
                          </li>
                        </>
                      ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form
                className="relative flex flex-1"
                action="#"
                method="GET"
              ></form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src={userImage}
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {user ? user.name : "Tom Cook"}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Link to="/profile">
                        {" "}
                        <button className="p-2 ">Profile</button>{" "}
                      </Link>
                      <button className="p-2 " onClick={handleDelete}>
                        Sign out
                      </button>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
