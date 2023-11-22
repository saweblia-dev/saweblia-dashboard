import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Users from './pages/Users';
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Categories from './pages/Categories/Categories'
import Prestations from './pages/Prestation/Prestations'
import Factures from './pages/Facture/Factures'
import ModifierFacture from './pages/Facture/ModifierFacture'
import ModifierPrestation from './pages/Prestation/ModifierPrestation'
import AjouterPrestation from './pages/Prestation/AjouterPrestation'
import Commercials from './pages/commercials/Commercials'
import AjouterCommercial from './pages/commercials/AjouterCommercial'
import ModifierCommercial from './pages/commercials/ModifierCommercial'
import ModifierCategories from './pages/Categories/ModifierCategories'
import AjouterCategories from './pages/Categories/AjouterCategories'
import Demandes from './pages/Demandes/Demandes';
import AjouterDemande from './pages/Demandes/AjouterDemande';
import  ParcoursCategories from './pages/Categories/ParcoursCategories'
import Graphiques from './pages/Graphiques/Graphiques'
import Login from './pages/Auth/Login';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in local storage
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="flex">
       {/* {isAuthenticated && <Header />}  */}
      {isAuthenticated && <Sidebar />}
    <div className="flex-1 ">
      {/* Contenu principal de la page */}
      <Router>
        <Routes>
          {!isAuthenticated && <Route path="/" element={<Login />} />}
          {isAuthenticated && <Route path="/" element={<Dashboard />} />}
          {isAuthenticated && <Route path="/Users" element={<Users />} />}
          {isAuthenticated && <Route path="/Categories" element={<Categories />} />}
          {isAuthenticated && <Route path="/Prestations" element={<Prestations />} />}
          {isAuthenticated && <Route path="/Factures" element={<Factures />} />}
          {isAuthenticated && <Route path="/ModifierPrestation/:id" element={<ModifierPrestation />} />}
          {isAuthenticated && <Route path="/AjouterPrestation" element={<AjouterPrestation />} />}
          {isAuthenticated && <Route path="/Commercials" element={<Commercials />} />}
          {isAuthenticated && <Route path='/AjouterCommercial' element={<AjouterCommercial />} />}        
          {isAuthenticated && <Route path="/ModifierCommercial/:id" element={<ModifierCommercial />} />}
          {isAuthenticated && <Route path='/AjouterCategories' element={<AjouterCategories/>} />}
          {isAuthenticated && <Route path='/ModifierCategories/:id' element={<ModifierCategories />} />}
          {isAuthenticated && <Route path='/Demandes' element={<Demandes/>} />}
          {isAuthenticated && <Route path='/AjouterDemande' element={<AjouterDemande/>} />}
          {isAuthenticated && <Route path='/ParcoursCategories/:id' element={<ParcoursCategories />} />}
          {isAuthenticated && <Route path='/Graphiques' element={<Graphiques/>}/>}
        </Routes>
      </Router>
    </div>
  </div>
  
  );
}

export default App;
