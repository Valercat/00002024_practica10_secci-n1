import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import CustomerList from './components/CustomerList.jsx'
import SalesList from './components/SalesList.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/sales" element={<SalesList />} />
      </Routes>
    </Router>
  )
}

export default App