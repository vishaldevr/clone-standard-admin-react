import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import {
  AllUsers,
  DeleteManyUser,
  DeleteUser,
} from "../../services/user-service";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { allUsers } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { RiDeleteBin3Fill } from "react-icons/ri";

function AllUser() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [pageValue, setPageValue] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [deleteAllUser, setDeleteAllUser] = useState(false);
  const [userArrDel, setUserArrDel] = useState([]);

  const handlePageChange = (event) => {
    setPageValue(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (event) => {
    setName(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterEmail = (event) => {
    setEmail(event.target.value);
    setCurrentPage(1);
  };

  const getAllUser = (token, pageValue, pageNumber, name, email) => {
    AllUsers(token, pageValue, pageNumber, name, email)
      .then((res) => {
        dispatch(allUsers(res.data.entities));
        setTotalPages(res.data.numberOfPages);
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  };

  function addUserDeleteArry(id) {
    const newUserArrDel = [...userArrDel];

    if (!newUserArrDel.includes(id)) {
      newUserArrDel.push(id);
      setUserArrDel(newUserArrDel);
    } else {
      const newAyy = newUserArrDel.filter((item) => item !== id);
      setUserArrDel(newAyy);
    }
  }

  useEffect(() => {
    getAllUser(token, pageValue, currentPage, name, email);
  }, [token, pageValue, currentPage, name, email]);

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

  function handleDelete(id) {
    DeleteUser(token, id)
      .then((res) => {
        if (res.status === 200) {
          getAllUser(token, pageValue, currentPage, name, email);
        }
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  }

  function deleteManyUser() {
    const data = {
      ids: userArrDel,
    };
    DeleteManyUser(token, data)
      .then((res) => {
        if (res.status === 200) {
          getAllUser(token, pageValue, currentPage, name, email);
          setUserArrDel([]);
          setDeleteAllUser(false);
        }
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, email
            and status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/add-user"
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </Link>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <input
          type="text"
          placeholder="Enter name "
          className="border p-1"
          value={name}
          onChange={handleFilterChange}
        />

        <input
          type="text"
          placeholder="Enter email "
          className="border p-1"
          value={email}
          onChange={handleFilterEmail}
        />

        {userArrDel.length > 0 && (
          <>
            {" "}
            {deleteAllUser ? (
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
                          onClick={() => setDeleteAllUser(!deleteAllUser)}
                        >
                          <div className="flex gap-2 items-center justify-center">
                            <span className="text-lg font-semibold">No</span>{" "}
                            <ImCross />
                          </div>
                        </button>
                        <button
                          className="text-green-600 text-xl hover:text-green-800 bg-green-300 p-2 rounded-lg"
                          onClick={() => deleteManyUser()}
                        >
                          <div className="flex gap-2 items-center justify-center">
                            <span className="text-lg font-semibold">Yes</span>{" "}
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
                onClick={() => setDeleteAllUser(!deleteAllUser)}
                className="bg-red-300 p-2 hover:bg-red-400 rounded-md text-black font-semibold"
              >
                Delete selected user
              </button>
            )}
          </>
        )}
      </div>
      <UserTable
        handleDelete={handleDelete}
        addUserDeleteArry={addUserDeleteArry}
      />
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

export default AllUser;
