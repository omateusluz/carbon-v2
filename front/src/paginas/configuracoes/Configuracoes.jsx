import '../../styles/Configuracoes.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Configuracoes(){

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div className="configuracoes">
          <div className="group-wrapper">
            <div className="group">
              <div className="bloco-II">
                <img className="line" alt="Line" src="line.svg" />
                <div className="parte-v">
                  <a className="p" href='/recuperar'>Editar -&gt;</a>
                  <p className="text-wrapper">Mantém a segurança de seu dinheiro.</p>
                  <div className="h">Senha</div>
                </div>
                <img className="img" alt="Line" src="image.svg" />
                <div className="parte-IV">
                  <a className="p" href='/email'>Editar -&gt;</a>
                  <div className="div">luz@gmail.com</div>
                  <p className="text-wrapper">Usado para mantermos o contato.</p>
                  <div className="h">Email</div>
                </div>
                <img className="line-2" alt="Line" src="line-2.svg" />
                <img className="line-3" alt="Line" src="line-3.svg" />
                <div className="parte-II">
                  <div className="div">omateusluz</div>
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
                <img className="line-4" alt="Line" src="line-4.svg" />
                <div className="parte-i">
                  <div className="div">17865484326</div>
                  <p className="text-wrapper">Guarde para recuperar a conta.</p>
                  <div className="h">Token de Segurança</div>
                </div>
                <img className="line-5" alt="Line" src="line-5.svg" />
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