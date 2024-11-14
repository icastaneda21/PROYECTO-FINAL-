import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPages';
import ProductRegistration from './pages/ProductRegistry';
import ClientRegistration from './pages/ClientRegistry';
import ClientMap from './pages/ClientMapPage';
import SalesSummary from './pages/SalesSummaryPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product-registration" element={<ProductRegistration />} />
        <Route path="/client-registration" element={<ClientRegistration />} />
        <Route path="/client-map" element={<ClientMap />} />
        <Route path="/sales-summary" element={<SalesSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
