import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { TbBounceRightFilled } from "react-icons/tb";
import { BiSolidRectangle } from "react-icons/bi";
import { RiEditBoxLine } from "react-icons/ri";
import React from "react";
// eslint-disable-next-line react/prop-types
export default function UserTable({ handleDelete, addUserDeleteArry }) {
  const users = useSelector((state) => state.auth.users);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-slate-100 rounded-sm">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  ></th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    status
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <input
                        type="checkbox"
                        onClick={() => addUserDeleteArry(user._id)}
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.is_active ? (
                        <span className="text-green-600 text-[25px]">
                          <TbBounceRightFilled />
                        </span>
                      ) : (
                        <span className="text-red-600 text-xl">
                          <BiSolidRectangle />
                        </span>
                      )}
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <div className="flex gap-2 justify-center align-middle">
                        <Link
                          to={`/edit-user/${user._id}`}
                          className="text-indigo-600 hover:text-indigo-900 mt-1"
                        >
                          <RiEditBoxLine className="font-semibold  text-xl text-green-500" />
                        </Link>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <MdDelete className="font-semibold mt-1 text-xl text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
