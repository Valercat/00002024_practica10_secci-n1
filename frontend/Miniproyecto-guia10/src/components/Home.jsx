import { useNavigate } from "react-router-dom" ;
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import CustomerList from "./CustomerList.jsx";
import RegistroVenta from "./registroVenta.jsx";
import SalesList from "./SalesList.jsx";

import "./Home.css";

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <>
    <div>
    <CustomerList />
    <br />
    <RegistroVenta />
    <br />
    <SalesList />
    </div>
    </>
  );
}

export default Home;