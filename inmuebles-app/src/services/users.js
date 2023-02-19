import axios from "axios";
const baseUrl = "/api/users";

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const updateUser = async (newUser, token) => {
  const newToken = `bearer ${token}`;

  const config = {
    headers: { Authorization: newToken },
  };
  const response = await axios.put(`${baseUrl}/updateUser/`, newUser, config);
  return response.data;
};

const updatePassword = async (newPassword, token) => {
  const newToken = `bearer ${token}`;

  const config = {
    headers: { Authorization: newToken },
  };

  const response = await axios.put(
    `${baseUrl}/updatePassword/`,
    newPassword,
    config
  );
  return response.data;
};

const updateImage = async (newImage, token) => {
  const newToken = `bearer ${token}`;

  const config = {
    headers: { Authorization: newToken },
  };

  const response = await axios.put(`${baseUrl}/updateImage/`, newImage, config);
  return response.data;
};

const getImage = async (token) => {
  const newToken = `bearer ${token}`;
  const config = {
    headers: { Authorization: newToken },
  };
  const response = await axios.get(`${baseUrl}/getImage/`, config);
  return response.data;
};

const getLiked = async (userId) => {
  // const newToken = `bearer ${token}`;
  // const config = {
  //   headers: { Authorization: newToken },
  // };
  const response = await axios.get(`${baseUrl}/${userId}/getLiked/`);
  return response.data;
};

const addLiked = async (propertyId, token) => {
  const newToken = `bearer ${token}`;
  const config = {
    headers: { Authorization: newToken },
  };
  const response = await axios.put(`${baseUrl}/addLiked/`, propertyId, config);
  return response.data;
};

const deleteLiked = async (propertyId, token) => {
  const newToken = `bearer ${token}`;
  const config = {
    headers: { Authorization: newToken },
  };
  const response = await axios.put(
    `${baseUrl}/deleteLiked/`,
    propertyId,
    config
  );
  return response.data;
};

export default {
  createUser,
  updateUser,
  updatePassword,
  updateImage,
  getImage,
  addLiked,
  deleteLiked,
  getUser,
  getLiked
};
