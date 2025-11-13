import { db } from "../data/db/connection.js";

export const Customers = async (req, res) => {
  db.query('SELECT * FROM customers', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};
