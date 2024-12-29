import userDao from "../models/persistence/user.dao.js";

const getAllUser = async () => await userDao.getAll();
const getUser = async (userId) => await userDao.get(userId);
const addUser = async (details) => await userDao.insert(details);
const updateUser = async (userId, details) => await userDao.update(userId, details);
const removeUser = async (userId) => await userDao.remove(userId);

export default {
  getAllUser,
  getUser,
  addUser,
  updateUser,
  removeUser,
};
