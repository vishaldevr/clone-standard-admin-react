import axios from "axios";
axios.defaults.headers.common["authorization"] = localStorage.getItem("token");

const PORT = "http://localhost:5000/emails";

export const getEmails = async (pageValue, pageNumber) => {
  return axios.get(
    `${PORT}?pageNumber=${pageNumber}&pageSize=${pageValue}&sortOrder=desc&sortField=_id`
  );
};

export const getEmail = async (id) => {
  return axios.get(`${PORT}/${id}`);
};

export const updateEmail = async (id, formData) => {
  return axios.patch(`${PORT}/${id}`, formData);
};

export const createEmail = async (formData) => {
  return axios.post(`${PORT}/`, formData);
};

export const deleteEmail = async (id) => {
  return axios.delete(`${PORT}/${id}`);
};
export const deleteManyEmail = async (data) => {
  return axios.post(`${PORT}/delete`, data);
};
