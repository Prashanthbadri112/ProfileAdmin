import users from '../data/users.data.js';

export const getAll = async () => {
    return await users.find();
};

export const get = async (usersId) => {
    return await users.findOne({ _id: usersId });
};

export const insert = async (details) => {
    const newusers = new users(details);
    await newusers.save();
    return newusers;
};

export const update = async (usersId, newDetails) => {
    return await users.findOneAndUpdate({ _id: usersId }, newDetails, { new: true });
};

export const remove = async (usersId) => {
    return await users.findOneAndDelete({ _id: usersId });
};

export default {
    getAll,
    get,
    insert,
    update,
    remove,
};
