import axios from "axios";
axios.defaults.headers.common["authorization"] = localStorage.getItem("token");

const PORT = "http://localhost:5000/settings";

export const createOrUpdateSetting = async (formData) => {
  return axios.post(`${PORT}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getFirstSetting = async () => {
  return axios.get(`${PORT}/`);
};

export const getSettingById = async (id) => {
  return axios.get(`${PORT}/${id}`);
};

export const sendTestMail = async (formData) => {
  return axios.post(`${PORT}/send_test_mail`, formData);
};
