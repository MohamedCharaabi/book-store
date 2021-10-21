"use strict";

import express from "express";
const router = express.Router();
import { con } from "../config/database.js";

export const getBooks = async (req, res) => {
  await con
    .select("*")
    .from("books")
    .then((books) => {
      res.json(books);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getBooksWithLimits = async (req, res) => {
  const { page } = req.query;
  const start = parseInt(page) * 5;
  console.log(start);
  await con
    .select("*")
    .from("books")
    .limit(5)
    .offset(start)
    .then((books) => {
      res.json(books);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  await con
    .select("*")
    .from("books")
    .where("id", id)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const addBook = async (req, res) => {
  const { title, author, genre, description, cover_url } = req.body;
  const newBook = { title, author, genre, description, cover_url };
  await con
    .insert(newBook)
    .into("books")
    .then(() => {
      res.json("Book added");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, description, cover_url } = req.body;
  const updatedBook = { title, author, genre, description, cover_url };
  await con
    .update(updatedBook)
    .from("books")
    .where("id", id)
    .then(() => {
      res.json("Book updated");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  await con
    .delete()
    .from("books")
    .where("id", id)
    .then(() => {
      res.json("Book deleted");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const searchBook = async (req, res) => {
  const { term } = req.params;
  await con
    .select("*")
    .from("books")
    .where("title", "like", `%${term}%`)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default router;
