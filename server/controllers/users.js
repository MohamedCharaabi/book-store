import express from "express";
import bcrypt from "bcrypt";
import dotEnv from "dotenv";
import jwt from "jsonwebtoken";

dotEnv.config();
const router = express.Router();
import { con } from "../config/database.js";

export const getUsers = async (req, res) => {
  await con
    .select("*")
    .from("users")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getUsersWithLimits = async (req, res) => {
  const { page } = req.query;
  const start = parseInt(page) * 5;
  console.log(start);
  await con
    .select("*")
    .from("users")
    .limit(5)
    .offset(start)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  await con
    .select("*")
    .from("users")
    .where("id", id)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user already exists
  await con
    .select("*")
    .from("users")
    .where("email", email)
    .then((user) => {
      if (user.length > 0) {
        return res.status(400).json("User already exists");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));

  // salt and hash password
  const salt = bcrypt.genSaltSync(9);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = {
    name,
    email,
    password: hash,
  };
  await con
    .insert(newUser)
    .into("users")
    .then(() => {
      return res.json("User added");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  await con
    .select("*")
    .from("users")
    .where("email", email)
    .then((user) => {
      if (user.length === 0) {
        return res.status(400).json("User does not exist");
      } else if (!bcrypt.compare(password, user[0].password)) {
        return res.status(400).json("Incorrect password");
      }

      // create jwt token
      const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);

      const authUserState = {
        name: user[0].name,
        email: user[0].email,
      };
      return res.json({ authUserState, token: token });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const updatedUser = { name, email, password };
  await con
    .update(updatedUser)
    .from("users")
    .where("id", id)
    .then(() => {
      res.json("User updated");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await con
    .delete()
    .from("users")
    .where("id", id)
    .then(() => {
      res.json("User deleted");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const searchUsers = async (req, res) => {
  const { term } = req.params;
  await con
    .select("*")
    .from("users")
    .where("name", "like", `%${term}%`)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default router;
