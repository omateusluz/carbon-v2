import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//Configuracoes do React Router (npm install react-router-dom)
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

//Importando rotas

import Cadastro from './paginas/cadastro/Cadastro.jsx';
import Configuracoes from './paginas/configuracoes/Configuracoes.jsx';
import Dashboard from './paginas/dashboard/Dashboard.jsx';
import Detalhes from './paginas/detalhes/Detalhes.jsx';
import Entrar from './paginas/entrar/Entrar.jsx';
import EnvioUm from './paginas/envio-um/EnvioUm.jsx';
import EnvioDois from './paginas/envio-dois/EnvioDois.jsx';
import EnvioTres from './paginas/envio-tres/EnvioTres.jsx';
import Home from './paginas/home/Home.jsx';
import NovoEmailUm from './paginas/novo-email-um/NovoEmailUm.jsx';
import NovoEmailDois from './paginas/novo-email-dois/NovoEmailDois.jsx';
import RecuperarUm from './paginas/recuperar-um/RecuperarUm.jsx';
import RecuperarDois from './paginas/recuperar-dois/RecuperarDois.jsx';
import NaoEncontrado from './paginas/NaoEncontrado.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: 'cadastro',
    element: <Cadastro />
  },
  {
    path: 'configuracoes',
    element: <Configuracoes />
  },
  {
    path: 'dashboard',
    element: <Dashboard />
  },
  {
    path: 'detalhes',
    element: <Detalhes />
  },
  {
    path: 'entrar',
    element: <Entrar />
  },
  {
    path: 'envio-um',
    element: <EnvioUm />
  },
  {
    path: 'envio-dois',
    element: <EnvioDois />
  },
  {
    path: 'envio-tres',
    element: <EnvioTres />
  },
  {
    path: 'email-um',
    element: <NovoEmailUm />
  },
  {
    path: 'email-dois',
    element: <NovoEmailDois />
  },
  {
    path: 'recuperar-um',
    element: <RecuperarUm />
  },
  {
    path: 'recuperar-dois',
    element: <RecuperarDois />
  },
  {
    path: 'nao-encontrado',
    element: <NaoEncontrado />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)