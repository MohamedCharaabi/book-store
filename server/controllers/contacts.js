"use strict";

import express from "express";
import { con } from "../config/database.js";
const router = express.Router();

export const getContacts = async (req, res) => {
  await con
    .select("*")
    .from("contacts")
    .then((contacts) => {
      res.json(contacts);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getContact = async (req, res) => {
  const { id } = req.params;
  await con
    .select("*")
    .from("contacts")
    .where("id", id)
    .then((contact) => {
      res.json(contact);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getReclamsWithLimits = async (req, res) => {
  const { page } = req.query;
  const start = parseInt(page) * 5;
  console.log(start);
  await con
    .select("*")
    .from("contacts")
    .limit(5)
    .offset(start)
    .then((cts) => {
      res.json(cts);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const addContact = async (req, res) => {
  const { first_name, last_name, email, subject } = req.body;
  const newContact = { first_name, last_name, email, subject };
  await con
    .insert(newContact)
    .into("contacts")
    .then(() => {
      res.json("contact added");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, subject } = req.body;
  const updatedContact = { first_name, last_name, email, subject };
  await con
    .update(updatedContact)
    .from("contacts")
    .where("id", id)
    .then(() => {
      res.json("Contact updated");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  await con
    .delete()
    .from("contacts")
    .where("id", id)
    .then(() => {
      res.json("Contact deleted");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const searchContact = async (req, res) => {
  const { search } = req.params;
  await con
    .select("*")
    .from("contacts")
    .where("first_name", "like", `%${search}%`)
    .then((contacts) => {
      res.json(contacts);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default router;
