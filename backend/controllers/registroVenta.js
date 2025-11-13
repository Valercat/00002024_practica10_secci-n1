import { db } from "../data/db/connection.js";

export const registroVenta = async (req, res) => {
  const { id_customer, amount } = req.body

  //Verificar que los datos se ingresen
  if (!id_customer || !amount) {
    return res.status(400).json({ error: "Faltan campos: id_customer o amount" });
  }

  try {
    //Verificar si el cliente existe
    const checkCustomer = await db.query(
      "SELECT id FROM customers WHERE id = $1",
      [id_customer]
    );
    //Error si el cliente no existe
    if (checkCustomer.rows.length === 0) {
      return res.status(404).json({ error: "El cliente no existe" });
    }

    //Insertar la venta con fecha automatica NOW()
    await db.query(
      "INSERT INTO sales (id_customer, amount, created_at) VALUES ($1, $2, NOW())",
      [id_customer, amount]
    );

    // Respuesta exitosa
    res.status(200).json({ message: "Venta registrada correctamente" });

  } catch (error) {
    console.error("Error al registrar la venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }

};
