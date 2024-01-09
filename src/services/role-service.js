import axios from "axios";

const PORT = "http://localhost:5000/roles/";

export const Roles = async (token, pageValue, pageNumber) => {
  return axios.get(
    `${PORT}?pageNumber=${pageNumber}&pageSize=${pageValue}&sortOrder=desc&sortField=_id`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
};

export const AllRoles = async (token) => {
  return axios.get(
    `${PORT}allroles`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
};


export const GetRole = async (token, id) => {
  return axios.get(`${PORT}${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};


export const UpdateRole = async (token, id, formData) => {
    return axios.patch(`${PORT}${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  };

  export const CreateRole = async (token, formData) => {
    return axios.post(`${PORT}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  };


  export const DeleteRole = async (token, id) => {
    return axios.delete(`${PORT}${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  };
  export const DeleteManyRoles = async (token, data) => {
    return axios.post(`${PORT}delete`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  };