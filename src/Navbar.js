import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    
  return (
    <nav className="navbar">
      <h1>Minha Aplicação</h1>
      <div className="links">
        <Link to="/lista">Lista de Tarefas</Link>
        <Link to="/perfil">Perfil</Link>
      </div>
    </nav>
  );
}

export default Navbar;
