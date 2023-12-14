import '../../styles/RecuperarUm.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function RecuperarUm(){

    const schema = yup.object({
        email: yup.string().email('Email inválido').required('Email obrigatório'),
        codigo: yup.string().required(),
    });

    const [msg, setMsg] = useState(' ');

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        
        try {
            const response = await axios.post('http://localhost:3000/recuperar', data);

            //Extrair o token
            const token = response.data.token;
            sessionStorage.setItem('token', token);
            if(token)
                setMsg('Autenticado');
        } catch (error) {
            setMsg(error.response.data);
        }   
        
    }

    if(msg.toLowerCase().includes('autenticado')){
        return <Navigate to='/recuperar-dois' />
    }

    return (
        <div className="enter">
          <p>{msg}</p>
          <p className='erro'>{errors.email?.message}</p>
          <p className='erro'>{errors.codigo?.message}</p>
          <div className="div1" id="bloco">
            <div className="links1" id="lins">
              <a className="p23" href="/entrar">{`<- Retornar`}</a>
            </div>
        
            <form onSubmit={handleSubmit(submit)} noValidate>

                <h3 className="h33">Email</h3>
                <input className="input3" type="text" placeholder="endereco de email" id="email" {...register('email')} />
                
                <h3 className="h32">Codigo</h3>
                <input className="input2" type="text" placeholder="codigo de recuperacao" id="codigo" {...register('codigo')} />
                
                <button className="button1" id="botao">
                    <h3 className="h3-21">{`Recuperar ->`}</h3>
                </button>
            </form>          

            <div className="line1" />
            <h2 className="h21">Insira os dados para recuperar</h2>
            <h1 className="h11">Redefinir a senha</h1>
            <img className="logo-icon1" alt="" src="/logo.svg" />
          </div>
        </div>
    );
    
}