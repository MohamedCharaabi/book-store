import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  getUsersWithLimits,
  loginUser,
  registerUser,
  searchUsers,
  updateUser,
} from "../controllers/users.js";
import { checkUsersTable, verifyToken } from "../middlewers/users.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/limit/", checkUsersTable, getUsersWithLimits);
router.get("/:id", checkUsersTable, getUser);
router.post("/register", checkUsersTable, registerUser);
router.post("/login", checkUsersTable, loginUser);
router.patch("/:id", checkUsersTable, updateUser);
router.delete("/:id", checkUsersTable, deleteUser);
router.get("/search/:term", checkUsersTable, searchUsers);

export default router;
