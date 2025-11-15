import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./TableStyle.css";

export default function CustomerList() {
    const [customers, setCustomer] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
  const fetchCustomer = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.get('http://localhost:5000/api/customers', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('Respuesta raw:', res);
      
      //Verificar si los datos son validos
      if (res.data && Array.isArray(res.data)) {
        setCustomer(res.data);
      } else if (res.data && typeof res.data === 'object') {
        //Si los datos estan anidados en un objeto
        const customers = res.data.data || res.data.customers;
        if (Array.isArray(customers)) {
          setCustomer(customers);
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
  
  fetchCustomer();
}, []);

return (
        <>
            <div>
 
                <div id = "tabla-clientes">
                <h3>Tabla de clientes </h3>
                  <table className = "tabla-customer"> 
                    <thead>
                    <tr>
                    <th>Id</th>
                    <th>Nombres</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>codigo</th>
                    </tr>
                    </thead>
                    <tbody>
                      {customers.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.address}</td>
                      <td>{u.phone}</td>
                      <td>{u.code}</td>
                    </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
            
            </div>  
        </>
    );
}