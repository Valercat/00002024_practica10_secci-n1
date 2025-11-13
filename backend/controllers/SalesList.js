import { db } from "../data/db/connection.js";

export const salesList = async (req, res) => {
    db.query(`SELECT s.id, s.amount, s.created_at, c.name
              FROM sales s
              JOIN customers c ON s.id_customer = c.id;`
    , (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};
