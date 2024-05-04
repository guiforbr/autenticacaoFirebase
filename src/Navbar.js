import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    
  return (
    <nav className="navbar">
      <div className="links">
        <ul>
          <li><Link to="/lista">Lista de Tarefas</Link></li>
          <li><Link to="/perfil">Perfil</Link></li>
        </ul>        
      </div>
    </nav>
  );
}

export default Navbar;
