import axios from "axios";

const PORT = "http://localhost:5000/auth/";

export const RegisteredUser = async (formData) => {
  return await axios.post(`${PORT}signup`, formData);
};

export const LoginUser = async (formData) => {
  return axios.post(`${PORT}signin`, formData);
};

export const UpdateLoginUser = async (token, formData) => {
  return axios.post(`${PORT}update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
};

export const ForgotPassword = async (formData) => {
  return axios.post(`${PORT}forgot-password`, formData);
};

export const ResetPasswordApi = async (resetToken, formData) => {
  return axios.post(`${PORT}reset-password/${resetToken}`, formData);
};

export const Profile = async (token) => {
  return axios.get(`${PORT}me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
export const GetPermissions = async (token) => {
  return axios.get(`${PORT}permissions`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
