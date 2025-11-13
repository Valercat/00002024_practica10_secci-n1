import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./CustomerList.css"

export default function SalesList() {
    const [sale, setSale] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
    const fetchSales = async () => {
    try{
      setLoading(true);
      setError(null);
      
      const res = await axios.get('http://localhost:5000/api/salesList?t=${Date.now()}', {
        headers: {
          'Accept': 'application/json'
        }
        
      });
      
      console.log('Respuesta raw:', res);
      
      // Check if we have valid data
      if (res.data && Array.isArray(res.data)) {
        setSale(res.data);
      } else if (res.data && typeof res.data === 'object') {
        // If data is nested in an object
        const sale = res.data.data || res.data.sale;
        if (Array.isArray(sale)) {
          setSale(sale);
        } else {
          throw new Error('Datos recibidos no son un array de ');
        }
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (err) {
      console.error('Error detallado:', err);
      setError(
        err.response 
          ? `Error del servidor: ${err.response.status} ${err.response.statusText}`
          : `Error de conexión: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };
  
  fetchSales();

    const interval = setInterval(fetchSales, 5000);

  // limpiar el intervalo al desmontar
  return () => clearInterval(interval);

  

}, []);

return(
    <>
        <div>
            <h3>Lista de ventas</h3>
            <table className = "tabla-customer"> 
                    <thead>
                    <tr>
                    <th>ID Venta</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                    <th>Nombre Cliente</th>
                    </tr>
                    </thead>
                    <tbody>
                      {sale.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.amount}</td>
                      <td>{u.created_at}</td>
                      <td>{u.name}</td>
                    </tr>
                    ))}
                    </tbody>
                  </table>
        </div>
    </>
    );
}