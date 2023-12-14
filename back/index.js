    require("dotenv").config();
    const express = require('express');
    const app = express();
    const fs = require('fs');
    const cors = require('cors');
    const path = require('path');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');

    //Necessário para extrair os dados de Forms vindos de uma requisição POST
    app.use(express.json());
    app.use(cors());


    app.listen(3000, () => {
        console.log('Servidor na porta 3000');
    });

    const User = require('./model/User');

    //Requisicao com POST publica para autenticar usuário
    app.post('/login', async (req,res) => {

        //extraindo os dados do formulário para criacao do usuario
        const {email, password} = req.body; 
        
        //Abre o bd (aqui estamos simulando com arquivo)
        const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
        const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        //verifica se existe usuario com email    
        for (let user of usuariosCadastrados){
            if(user.email === email){
                const passwordValidado = await bcrypt.compare(password, user.password);
                if(passwordValidado){ 
                    
                    const token = jwt.sign(user, process.env.TOKEN);

                    return res.json({ "token" : token});
                }
                
                else
                    return res.status(422).send(`Usuario ou senhas incorretas.`);
            }   
        }
        //Nesse ponto não existe usuario com email informado.
        return res.status(409).send(`Usuario com email ${email} não existe. Considere criar uma conta!`);

    })

    //Requisicao com POST publica para criar usuário
    app.post('/create', async (req,res) => {
        //extraindo os dados do formulário para criacao do usuario
        const {username, email, password} = req.body; 
        
        const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
        const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        //verifica se já existe usuario com o email informado
        
        for (let users of usuariosCadastrados){
            if(users.email === email){
                //usuario já existe. Impossivel criar outro
                //Retornando o erro 409 para indicar conflito
                return res.status(409).send(`Usuario com email ${email} já existe.`);
            }   
        }
        
        //Deu certo. Vamos colocar o usuário no "banco"
        //Gerar um id incremental baseado na qt de users
        const id = usuariosCadastrados.length + 1;
        
        // gerando uma chave de recuperação
        const recuperacao = Math.floor(10000000 + Math.random() * 90000000).toString();

        //gerar uma senha cryptografada
        const salt = await bcrypt.genSalt(10);
        const passwordCrypt = await bcrypt.hash(password,salt);

        //Criacao do user
        const user = new User(id, username, email, passwordCrypt, recuperacao);

        //Salva user no "banco"
        usuariosCadastrados.push(user);
        fs.writeFileSync(jsonPath,JSON.stringify(usuariosCadastrados,null,2));
        res.send(`Tudo certo usuario criado com sucesso.`);
    });


    app.get('/disciplinas', verificaToken,  (req,res) => {

        //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
        //__dirname é o diretorio corrente onde esse arquivo esta executando
        const jsonPath = path.join(__dirname, '.', 'db', 'disciplinas.json');
        const disciplinas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        return res.json(disciplinas);

    })

    app.get('/configuracoes', verificaToken,  (req,res) => {

        //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
        //__dirname é o diretorio corrente onde esse arquivo esta executando
        const jsonPath = path.join(__dirname, '.', 'db', 'disciplinas.json');
        const disciplinas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        return res.json(configuracoes);

    })

    app.get('/dashboard', verificaToken,  (req,res) => {

        //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
        //__dirname é o diretorio corrente onde esse arquivo esta executando
        const jsonPath = path.join(__dirname, '.', 'db', 'disciplinas.json');
        const disciplinas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        return res.json(dashboard);

    })

    app.get('/detalhes', verificaToken,  (req,res) => {

        //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
        //__dirname é o diretorio corrente onde esse arquivo esta executando
        const jsonPath = path.join(__dirname, '.', 'db', 'disciplinas.json');
        const disciplinas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        return res.json(detalhes);

    })

    app.get('/envio-um', verificaToken,  (req,res) => {

        //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
        //__dirname é o diretorio corrente onde esse arquivo esta executando
        const jsonPath = path.join(__dirname, '.', 'db', 'disciplinas.json');
        const disciplinas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        return res.json(envio-um);

    })

    app.get('/envio-dois', verificaToken,  (req,res) => {

        //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
        //__dirname é o diretorio corrente onde esse arquivo esta executando
        const jsonPath = path.join(__dirname, '.', 'db', 'disciplinas.json');
        const disciplinas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        return res.json(envio-dois);

    })

    app.get('/envio-tres', verificaToken,  (req,res) => {

        //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
        //__dirname é o diretorio corrente onde esse arquivo esta executando
        const jsonPath = path.join(__dirname, '.', 'db', 'disciplinas.json');
        const disciplinas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        return res.json(envio-tres);

    })

    app.get('/novo-email-um', verificaToken,  (req,res) => {

        //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
        //__dirname é o diretorio corrente onde esse arquivo esta executando
        const jsonPath = path.join(__dirname, '.', 'db', 'disciplinas.json');
        const disciplinas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        return res.json(novo-email-um);

    })

    app.get('/novo-email-dois', verificaToken,  (req,res) => {

        //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
        //__dirname é o diretorio corrente onde esse arquivo esta executando
        const jsonPath = path.join(__dirname, '.', 'db', 'disciplinas.json');
        const disciplinas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        return res.json(novo-email-dois);

    })

    app.get('/disciplinas/:sigla', verificaToken, (req,res) => {

    
        //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
        //__dirname é o diretorio corrente onde esse arquivo esta executando
        const jsonPath = path.join(__dirname, '.', 'db', 'disciplinas.json');
        const disciplinas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
        
        const params = req.params;
        //buscar a disciplina
        for(let disciplina of disciplinas){
            if(params.sigla.toUpperCase()===disciplina.sigla){
                return res.json(disciplina);
            }
        }
        return res.status(403).send(`Sigla Não Encontrada!`);

    })

    function verificaToken(req,res,next){

        const authHeaders = req.headers['authorization'];
        
        const token = authHeaders && authHeaders.split(' ')[1]
        //Bearer token

        if(token == null) return res.status(401).send('Acesso Negado');

        jwt.verify(token, process.env.TOKEN, (err) => {
            if(err) return res.status(403).send('Token Inválido/Expirado');
            next();
        })

    }