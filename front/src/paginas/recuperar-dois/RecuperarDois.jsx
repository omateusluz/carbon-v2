import '../../styles/RecuperarDois.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function RecuperarDois(){

    const schema = yup.object({
        password: yup.string().min(4,'Senha com no mínimo 4 caracteres').required(),
        passwordConf: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas devem coincidir!'),
    });

    const [msg, setMsg] = useState(' ');

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        
        try {
            const response = await axios.put('http://localhost:3000/recuperar-dois', data);

            //Extrair o token
            const token = response.data.token;
            sessionStorage.setItem('token', token);
            if(token)
                setMsg('Autenticado');
        } catch (error) {
            setMsg(error.response.data);
        }   
        
    }

    if(msg.toLowerCase().includes('sucesso')){
        return <Navigate to='/dashboard' />
    }

    return (
        <div className="enter">
          <p>{msg}</p>
          <p className='erro'>{errors.password?.message}</p>
          <p className='erro'>{errors.passwordConf?.message}</p>
          <div className="div1" id="bloco">
            <div className="links1" id="lins">
              <a className="p23" href="/entrar">{`<- Retornar`}</a>
            </div>
        
            <form onSubmit={handleSubmit(submit)} noValidate>

                <h3 className="h33">Senha *</h3>
                <input className="input3" placeholder="senha" type="password" id="password" {...register('password')} />
                
                <h3 className="h32">Confirmação da senha *</h3>
                <input className="input2" placeholder="confirmacao da senha" type="password"  id="passwordConf" {...register('passwordConf')} />
                
                <button className="button1" id="botao">
                    <h3 className="h3-21">{`Recuperar ->`}</h3>
                </button>
            </form>          

            <div className="line1" />
            <h2 className="h21">Minimo de 4 caracteres</h2>
            <h1 className="h11">Insira a nova senha</h1>
            <img className="logo-icon1" alt="" src="/logo.svg" />
          </div>
        </div>
    );
    
}