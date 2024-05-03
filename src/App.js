import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaInicial from './TelaInicial';
import ListaDeTarefas from "./ListaDeTarefas";
import Perfil from "./Perfil";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/lista" element={<ListaDeTarefas />} />
      </Routes>
    </Router>
  );
}

export default App;
