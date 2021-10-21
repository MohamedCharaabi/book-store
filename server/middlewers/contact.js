import { con } from "../config/database.js";

export const checkContactsTable = async (req, res, next) => {
  // check if table exists
  const tableExists = await con.schema.hasTable("contacts");
  if (!tableExists) {
    // create table
    await con.schema.createTable("contacts", (table) => {
      table.increments("id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.string("subject");
    });
    next();
  } else {
    next();
  }
};
