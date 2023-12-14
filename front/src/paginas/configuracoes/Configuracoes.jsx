import '../../styles/Configuracoes.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Configuracoes(){

    const email = sessionStorage.getItem('email');

    const [usuarioConfiguracoes, setUsuarioConfiguracoes] = useState({
      token: '',
      username: '',
      email: '',
    });
  
    const handleLogout = () => {
      sessionStorage.removeItem('token');
      window.location.href = '/';
    };
  
    useEffect(() => {
      // Função para buscar configurações do usuário no backend
      const getConfiguracoes = async () => {
        const token = sessionStorage.getItem('token');
  
        try {
          const response = await axios.get(`http://localhost:3000/configuracoes/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Atualize as informações do usuário no estado
          setUsuarioConfiguracoes(response.data);
        } catch (error) {
          console.error('Erro ao obter configurações:', error);
        }
      };
  
      getConfiguracoes();
    }, []); // O segundo argumento vazio garante que esta função seja chamada apenas uma vez no carregamento inicial
    
    return (
        <div className="configuracoes">
          <div className="group-wrapper">
            <div className="group">
              <div className="bloco-II">
                <img className="line" alt="Line" />
                <div className="parte-v">
                  <a className="p" href='/recuperar'>Editar -&gt;</a>
                  <p className="text-wrapper">Mantém a segurança de seu dinheiro.</p>
                  <div className="h">Senha</div>
                </div>
                <img className="img" alt="Line" />
                <div className="parte-IV">
                  <a className="p" href='/email'>Editar -&gt;</a>
                  <div className="divE">{usuarioConfiguracoes.email}</div>
                  <p className="text-wrapper">Usado para mantermos o contato.</p>
                  <div className="h">Email</div>
                </div>
                <img className="line-2" alt="Line" />
                <img className="line-3" alt="Line"  />
                <div className="parte-II">
                  <div className="divE">{usuarioConfiguracoes.username}</div>
                  <p className="text-wrapper">É mostrado ao efetuar ou receber pagamentos.</p>
                  <div className="h">Nome de usuario</div>
                </div>
                <div className="parte-II-wrapper">
                  <div className="parte-II-2">
                    <div className="p">Editar -&gt;</div>
                    <p className="text-wrapper">É necessário verificar suas credenciais.</p>
                    <div className="h">Deletar conta</div>
                  </div>
                </div>
                <img className="line-4" alt="Line"  />
                <div className="parte-i">
                  <div className="divE">{usuarioConfiguracoes.token}</div>
                  <p className="text-wrapper">Guarde para recuperar a conta.</p>
                  <div className="h">Token de Segurança</div>
                </div>
                <img className="line-5" alt="Line" />
              </div>
              <div className="bloco-i">
                <p className="h-2">Personalize e altere suas informações.</p>
                <div className="h-3">Configurações</div>
              </div>
              <div className="menu">
                <img className="vector" alt="Vector" src="fechar.svg" onClick={handleLogout}/>
                <img className="vector-2" alt="Vector" src="configuracoes.svg" onClick={() => window.location.href = "/dashboard"}/>
                <img className="logo" alt="Logo" src="logo.svg" onClick={() => window.location.href = "/dashboard"}/>
              </div>
            </div>
          </div>
        </div>
      );
};