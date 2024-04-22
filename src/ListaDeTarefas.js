import React, { useState, useEffect } from 'react';
import './ListaDeTarefas.css';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tarefasArmazenadas = JSON.parse(localStorage.getItem('tarefas'));
    if (tarefasArmazenadas) {
      setTarefas(tarefasArmazenadas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([...tarefas, novaTarefa]);
      setNovaTarefa('');
      setMostrarFormulario(false);
    }
  };

  const removerTarefa = (index) => {
    const novaLista = [...tarefas];
    novaLista.splice(index, 1);
    setTarefas(novaLista);
  };

  const Logout = async () => {
    try {
      await firebase.auth().signOut(); 
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        await currentUser.disconnect(); 
      }
      window.alert('Deslogando...');
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="lista-de-tarefas">
      <h1>Tarefas Etec</h1>
      <button className='logout' onClick={Logout}>Sair</button>
      {mostrarFormulario && (
        <div className="adicionar-tarefa">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Digite uma nova tarefa"
          />
          <button onClick={adicionarTarefa}>Adicionar</button>
        </div>
      )}
      {!mostrarFormulario && (
        <button className="botao-flutuante" onClick={() => setMostrarFormulario(true)}>+</button>
      )}
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index} className="tarefa">
            <div>{tarefa}</div>
            <div className="remover-tarefa" onClick={() => removerTarefa(index)}>Deslize para excluir</div>
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </div>    
  );
}

export default ListaDeTarefas;