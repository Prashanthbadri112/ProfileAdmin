import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";

import { getUser, addUser, updateUser, removeUser } from "./user.schemas.js";
import userController from "./controllers/user.controller.js";

const router = express.Router();

router.get("/all", userController.getAllUsers);

router.get(
  "/:id",
  expressYupMiddleware({ schemaValidator: getUser }),
  userController.getUser
);

router.post(
  "/",
  expressYupMiddleware({ schemaValidator: addUser }),
  userController.addUser
);

router.put(
  "/:id",
  expressYupMiddleware({ schemaValidator: updateUser }),
  userController.updateUser
);

router.delete(
  "/:id",
  expressYupMiddleware({ schemaValidator: removeUser }),
  userController.removeUser
);

export default router;
