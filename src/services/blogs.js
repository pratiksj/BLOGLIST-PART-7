import axios from "axios";
const baseUrl = "/api/blogs";

let token = JSON.parse(localStorage.getItem("loggedNoteappUser")).token;

// const setToken = (newToken) => {
//   token = `bearer ${newToken}`;
// };

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  console.log(response);
  return response.data;
};

export default { getAll, create, update, remove };
