import axios from "axios";

const PORT = "http://localhost:5000/users";

export const RegisteredUser = async (formData) => {
  return await axios.post(`${PORT}/signup`, formData);
};

export const LoginUser = async (formData) => {
  return axios.post(`${PORT}/signin`, formData);
};

export const AllUsers = async (token, pageValue, pageNumber, name, email) => {
  return axios.get(
    `${PORT}?pageNumber=${pageNumber}&pageSize=${pageValue}&sortOrder=desc&sortField=_id&filter=${
      name ? `name=${name}&` : ""
    }${email ? `email=${email}` : ""}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
};

export const GetUser = async (token, id) => {
  return axios.get(`${PORT}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const CreateUsers = async (token, formData) => {
  return axios.post(`${PORT}`, formData, {
    headers: {
      "Content-Type": 'multipart/form-data',
      Authorization: token,
    },
  });
};

export const UpdateUser = async (token, id, formData) => {
  return axios.patch(`${PORT}/${id}`, formData, {
    headers: {
      "Content-Type": 'multipart/form-data',
      Authorization: token,
    },
  });
};

export const DeleteUser = async (token, id) => {
  return axios.delete(`${PORT}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
export const DeleteManyUser = async (token, data) => {
  return axios.post(`${PORT}/delete`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
