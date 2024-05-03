import React, { useEffect } from 'react';
import './Perfil.css';
import perfil from './fotoPerfil.jfif'
import seta from './down-arrow.png'
import Navbar from './Navbar';

function Perfil() {

    useEffect(() => {
        let menus = document.getElementsByClassName('menuHidden');
        
        if (menus.length > 0) {
            Array.from(menus).forEach(menu => {
                menu.classList.remove('menuHidden');
            });
        } else {
            let a = document.getElementById('teste');
            if (a) {
                a.classList.add('menuHidden');
            }
        }
    }, []); // Executar apenas uma vez ao montar o componente

    const toggleMenu = () => {
        let menu = document.getElementById('teste');
        if (menu) {
            menu.classList.toggle('menuHidden');
        }
    };

    return(
        <><div>
            <Navbar />
        </div><div className="content">
                <div className="backgroundImage">
                    <img src={perfil} alt="Foto de perfil" />
                    <h2>Caio Daniel</h2>
                </div>
                <div className="menu">
                    <h3 onClick={toggleMenu}>Redes Sociais <img className="down-arrow" src={seta} alt="Seta Menu" /></h3>
                    <div className="menuHidden" id="teste">
                        <ul>
                            <li><a href="https://wa.me/5511982990135" className="Whatsapp" target="_blank" rel="noopener noreferrer">Whatsapp</a></li>
                            <li><a href="https://github.com/guiforbr" className="github" target="_blank" rel="noopener noreferrer">Github</a></li>
                            <li><a href="https://www.linkedin.com/in/caio-daniel-sobral-viana-181959234/" className="linkedin" target="_blank" rel="noopener noreferrer">Linkedin</a></li>
                            <li><a href="mailto:guiforbr@gmail.com" className="email" target="_blank" rel="noopener noreferrer">E-mail</a></li>
                        </ul>
                    </div>
                </div>
            </div></>
    );
}

export default Perfil;
