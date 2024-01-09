import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  DeleteManyRoles,
  DeleteRole,
  Roles,
} from "../../services/role-service";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin3Fill, RiEditBoxLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { BiSolidRectangle } from "react-icons/bi";
import { TbBounceRightFilled } from "react-icons/tb";
function AllRoles() {
  const [roles, setRoles] = useState([]);
  const [pageValue, setPageValue] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteAllRoles, setDeleteAllRoles] = useState(false);
  const [rolesArrDel, setRolesArrDel] = useState([]);
  const token = localStorage.getItem("token");

  const handlePageChange = (event) => {
    setPageValue(event.target.value);
    setCurrentPage(1);
  };

  const getAllRoles = (pageValue, pageNumber) => {
    Roles(token, pageValue, pageNumber)
      .then((res) => {
        setRoles(res.data.entities);
        setTotalPages(res.data.numberOfPages);
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  };

  useEffect(() => {
    getAllRoles(pageValue, currentPage);
  }, [pageValue, currentPage]);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function addUserDeleteArry(id) {
    const newrolesArrDel = [...rolesArrDel];

    if (!newrolesArrDel.includes(id)) {
      newrolesArrDel.push(id);
      setRolesArrDel(newrolesArrDel);
    } else {
      const newAyy = newrolesArrDel.filter((item) => item !== id);
      setRolesArrDel(newAyy);
    }
  }

  function handleDelete(id) {
    DeleteRole(token, id)
      .then((res) => {
        if (res.status === 200) {
          getAllRoles(pageValue, currentPage);
        }
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  }

  function deleteManyUser() {
    const data = {
      ids: rolesArrDel,
    };
    DeleteManyRoles(token, data)
      .then((res) => {
        if (res.status === 200) {
          getAllRoles(pageValue, currentPage);
          setRolesArrDel([]);
          setDeleteAllRoles(false);
        }
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto flex gap-44">
          <div>
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Roles
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the Roles
            </p>
          </div>
          <div>
            {rolesArrDel.length > 0 && (
              <>
                {" "}
                {deleteAllRoles ? (
                  <>
                    <div className="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="w-96 bg-white p-4 rounded-md">
                        <div className="flex flex-col items-center">
                          <p className="text-red-800 font-semibold mb-4">
                            Are you sure?
                          </p>
                          <div className="flex items-center space-x-4">
                            <button
                              className="text-red-600 hover:text-red-800 bg-red-300 p-2 rounded-lg"
                              onClick={() => setDeleteAllRoles(!deleteAllRoles)}
                            >
                              <div className="flex gap-2 items-center justify-center">
                                <span className="text-lg font-semibold">
                                  No
                                </span>{" "}
                                <ImCross />
                              </div>
                            </button>
                            <button
                              className="text-green-600 text-xl hover:text-green-800 bg-green-300 p-2 rounded-lg"
                              onClick={() => deleteManyUser()}
                            >
                              <div className="flex gap-2 items-center justify-center">
                                <span className="text-lg font-semibold">
                                  Yes
                                </span>{" "}
                                <RiDeleteBin3Fill />
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setDeleteAllRoles(!deleteAllRoles)}
                    className="bg-red-300 p-2 hover:bg-red-400 rounded-md text-black font-semibold"
                  >
                    Delete selected roles
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/add-role"
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Role
          </Link>
        </div>
      </div>
      {/* <UserTable /> */}

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
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Status
                    </th>
                    <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-0">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {roles.map((role) => (
                    <tr key={role._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <input
                          type="checkbox"
                          onClick={() => addUserDeleteArry(role._id)}
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {role.name}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {role.is_active ? (
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
                            to={`/edit-role/${role._id}`}
                            className="text-indigo-600  mt-1 hover:text-indigo-900"
                          >
                            <RiEditBoxLine className="font-semibold  text-xl text-green-500" />
                          </Link>
                          <button
                            onClick={() => handleDelete(role._id)}
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

      <hr />

      <div className="border p-2 flex justify-around mt-3">
        <div>
          <span>PageSize:</span>
          <select
            id="optionSelector"
            value={pageValue}
            onChange={handlePageChange}
            className="border p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="">
          <button
            className="border p-1 rounded-lg m-1"
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="m-2">
            {currentPage} of {totalPages}
          </span>
          {
            <button
              className="border p-1 rounded-lg "
              onClick={handleNextClick}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default AllRoles;
