import { useNavigate } from "react-router-dom" ;
import { useState } from "react" ;

import CustomerList from "./CustomerList.jsx";

import "./Home.css";

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <>
    <div>
    <CustomerList />
    </div>
    </>
  );
}

export default Home;