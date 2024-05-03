import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // alterado aqui
import 'firebase/compat/auth'; // alterado aqui
import './TelaInicial.css';
import logoEtec from './download.png';
import centroPaula from './download (1).png';
import google from './google.png';

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8cInf22LuBYsEUpmd4Sm52TtpRlPQCas",
  authDomain: "fir-auth-react-78e00.firebaseapp.com",
  databaseURL: "https://fir-auth-react-78e00-default-rtdb.firebaseio.com/",
  projectId: "fir-auth-react-78e00",
  storageBucket: "fir-auth-react-78e00.appspot.com",
  messagingSenderId: "230380253031",
  appId: "1:230380253031:web:191d96799eb8b2c65f09c2"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function TelaInicial() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password).then(
        () => {
            window.location.href = '/lista'
        }
      );
      setError(null);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError('Usuário não encontrado em nosso banco de dados');
      setTimeout(function() {  
        setError('');      
      }, 3000);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider).then(
                () => {
                    window.location.href = '/lista'
                }
            );
      setError(null);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError('Usuário não encontrado em nosso banco de dados');
      setTimeout(function() {  
        setError('');      
      }, 3000);
    }
  };

  const handleCadastrar = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setError(null);
      let resposta = document.getElementById('Resposta');
      resposta.innerHTML = 'Cadastrado com sucesso!';
      setTimeout(function() {
          resposta.innerHTML = '';
      }, 1000);
      
      // Cadastro bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError('Verificar dados do cadastro');
      setTimeout(function() {  
        setError('');      
      }, 3000);
    }
  }

  return (
    <div>
      <h1>Firebase Authentication</h1>
      <div className='logo-container'>
      <img src={logoEtec}/>
      <img src={centroPaula}/>
      </div>     
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLoginGoogle}><img src={google}/> Login com o Google</button>
        <button onClick={handleCadastrar}>Cadastrar</button>
      {error && <p>{error}</p>}
      <h1 id='Resposta'></h1>
    </div>
  );
}

export default TelaInicial;