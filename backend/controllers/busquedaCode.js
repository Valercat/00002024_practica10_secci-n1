import { db } from "../data/db/connection.js";

export const busquedaCodigo = async (req, res) => {
    const { code }  = req.query

  db.query('SELECT * FROM customers WHERE code = $1', 
    [code], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}
