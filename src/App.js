import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaInicial from './TelaInicial';
import ListaDeTarefas from "./ListaDeTarefas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/lista" element={<ListaDeTarefas />} />
      </Routes>
    </Router>
  );
}

export default App;
