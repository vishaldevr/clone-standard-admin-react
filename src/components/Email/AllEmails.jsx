import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  deleteEmail,
  deleteManyEmail,
  getEmails,
} from "../../services/email-service";
import { useDispatch, useSelector } from "react-redux";
import { allEmails } from "../../redux/slices/emailSlice";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin3Fill, RiEditBoxLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";

function AllEmails() {
  const { emails } = useSelector((state) => state?.email);
  const [pageValue, setPageValue] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rolesArrDel, setRolesArrDel] = useState([]);
  const [deleteAllEmail, setDeleteAllEmail] = useState(false);
  const dispatch = useDispatch();

  const handlePageChange = (event) => {
    setPageValue(event.target.value);
    setCurrentPage(1);
  };

  const getAllEmails = (pageValue, pageNumber) => {
    getEmails(pageValue, pageNumber)
      .then((res) => {
        dispatch(allEmails(res.data.entities));
        setTotalPages(res.data.numberOfPages);
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  };

  function handleDelete(id) {
    deleteEmail(id)
      .then((res) => {
        if (res.status === 200) {
          getAllEmails(pageValue, currentPage);
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
    deleteManyEmail(data)
      .then((res) => {
        if (res.status === 200) {
          getAllEmails(pageValue, currentPage);
          setRolesArrDel([]);
          setDeleteAllEmail(false);
        }
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  }

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

  useEffect(() => {
    getAllEmails(pageValue, currentPage);
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

  return (
    <>
      <div>
        <div>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto flex gap-44">
              <div>
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Emails
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the Emails
                </p>
              </div>
              <div>
                {rolesArrDel.length > 0 && (
                  <>
                    {" "}
                    {deleteAllEmail ? (
                      <>
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
                                    onClick={() =>
                                      setDeleteAllEmail(!deleteAllEmail)
                                    }
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
                      </>
                    ) : (
                      <button
                        onClick={() => setDeleteAllEmail(!deleteAllEmail)}
                        className="bg-red-300 p-2 hover:bg-red-400 rounded-md text-black font-semibold"
                      >
                        Delete selected emails
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
                to="/add-email"
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Email
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
                          Subject
                        </th>
                        <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-0">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {emails.map((email) => (
                        <tr key={email._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            <input
                              type="checkbox"
                              onClick={() => addUserDeleteArry(email._id)}
                            />
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {email.name}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {email.subject}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <div className="flex gap-2 justify-center align-middle">
                              <Link
                                to={`/edit-email/${email._id}`}
                                className="text-indigo-600   hover:text-indigo-900"
                              >
                                <RiEditBoxLine className="font-semibold mt-1 text-xl text-green-500" />
                              </Link>
                              <button
                                onClick={() => handleDelete(email._id)}
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
      </div>
    </>
  );
}

export default AllEmails;
