import React, { useState, useEffect } from 'react';
import './ListaDeTarefas.css';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 
import { getDatabase, ref as dbRef, onValue as dbOnValue, set as dbSet } from 'firebase/database';
import Navbar from './Navbar';

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      const database = getDatabase();
      const userTarefasRef = dbRef(database, `usuarios/${currentUser.uid}/tarefas`);

      dbOnValue(userTarefasRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTarefas(Object.values(data));
        } else {
          setTarefas([]);
        }
      });
    }
  }, [currentUser]);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      const novaLista = [...tarefas, novaTarefa];
      setTarefas(novaLista);
      setNovaTarefa('');
      setMostrarFormulario(false);

      if (currentUser) {
        const database = getDatabase();
        const userTarefasRef = dbRef(database, `usuarios/${currentUser.uid}/tarefas`);
        dbSet(userTarefasRef, novaLista).then(() => {
          console.log('Tarefa adicionada com sucesso.');
        }).catch((error) => {
          setError(error.message);
        });
      }
    }
  };

  const removerTarefa = (index) => {
    const novaLista = [...tarefas];
    novaLista.splice(index, 1);
    setTarefas(novaLista);

    if (currentUser) {
      const database = getDatabase();
      const userTarefasRef = dbRef(database, `usuarios/${currentUser.uid}/tarefas`);
      dbSet(userTarefasRef, novaLista).then(() => {
        console.log('Tarefa removida com sucesso.');
      }).catch((error) => {
        setError(error.message);
      });
    }
  };

  const Logout = async () => {
    try {
      await firebase.auth().signOut(); 
      window.alert('Deslogando...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <><div>
      <Navbar />
    </div><div className="lista-de-tarefas">
        <h1>Tarefas Etec</h1>
        <button className='logout' onClick={Logout}>Sair</button>
        {currentUser && (
          <>
            {mostrarFormulario && (
              <div className="adicionar-tarefa">
                <input
                  type="text"
                  value={novaTarefa}
                  onChange={(e) => setNovaTarefa(e.target.value)}
                  placeholder="Digite uma nova tarefa" />
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
          </>
        )}
        {error && <p>{error}</p>}
      </div></>    
  );
}

export default ListaDeTarefas;
