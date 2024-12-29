import { StatusCodes } from "http-status-codes";
import pino from 'pino'

import userService from "../services/user.service.js";

const logger = pino();
const STATUS = {
    success:true,
    failure:false
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        if (users.length) {
            return res.status(StatusCodes.OK).send(users);
        }
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: "No User Found...",
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUser(userId);
        if (user) {
            logger.info(`Retrieving the user ${userId}.`);
            return res.status(StatusCodes.OK).send(user);
        }
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: `User ${userId} not found.`,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const user = req.body;
        const addedUser = await userService.addUser(user);
        logger.info(`User has been added.`);
        res.status(StatusCodes.CREATED).send({
            status: STATUS.success,
            user: addedUser,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
};

// Repeat similar updates for updateUser and removeUser
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userDetails = req.body;

        const updatedUser = await userService.updateUser(userId, userDetails);

        if (updatedUser) {
            logger.info(`User ${userId} has been updated.`);
            return res.status(StatusCodes.OK).send({
                status: STATUS.success,
                user: updatedUser,
            });
        }

        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: `User ${userId} not found.`,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
};


const removeUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await userService.getUser(userId);

        if (user) {
            userService.removeUser(userId)
            logger.info(`User ${userId} has been deleted.`);
            return res.status(StatusCodes.OK).send({
                status: STATUS.success,
                message: `User ${userId} has been deleted.`,
            });
        }
        else{
            return res.status(StatusCodes.NOT_FOUND).send({
                status: STATUS.failure,
                message: `User ${userId} not found.`,
            });
        }
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
};


export default {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    removeUser,
};
