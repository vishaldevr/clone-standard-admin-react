import axios from "axios";

const PORT = "http://localhost:5000/logs/";

export const GetLogs = async (token, pageNumber) => {
  return axios.get(
    `${PORT}?page=${pageNumber}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
};