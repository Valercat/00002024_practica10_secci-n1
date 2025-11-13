import { useState } from "react";
import axios from "axios";
import "./registroVenta.css";

export default function RegistroVenta() {
  const [id_customer, setIdCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Esta funcion se ejecuta cuando el usuario envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); //Evita recargar la pagina
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/registroVenta", {
        id_customer,
        amount,
      });

      setMessage(res.data.message || "Venta registrada correctamente.");
      setIdCustomer("");
      setAmount("");
    } catch (err) {
      console.error("Error al registrar la venta:", err);
      setError(
        err.response?.data?.error ||
          "Error al registrar la venta. Verifica los datos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id = 'Contenedor-venta'>
      <h2>Registrar Nueva Venta</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del Cliente:</label>
          <input
            type="number"
            value={id_customer}
            onChange={(e) => setIdCustomer(e.target.value)}
            placeholder="Ejemplo: 1"
            required
            
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Monto ($):</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ejemplo: 50.00"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}

        >
          {loading ? "Registrando..." : "Registrar Venta"}
        </button>
      </form>

      {message && <p id = "Mensaje-correcto">{message}</p>}
      {error && <p id = "Mensaje-incorrecto">{error}</p>}
    </div>
  );
}
