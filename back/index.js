require("dotenv").config();
const express = require('express');
const session = require('express-session');
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

/** Sync */
function randomStringAsBase64Url(size) {
  return crypto.randomBytes(size).toString("base64url");
}

//Necessário para extrair os dados de Forms vindos de uma requisição POST
app.use(express.json());
app.use(cors());
app.use(
    session({
      secret: 'UzkM9WaOKZvV.nSfNdXdDV11',
      resave: true,
      saveUninitialized: true,
    })
  );

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

// Requisicao com POST publica para autenticar codigo de recuperacao
// e permitir recuperar e alterar senha
app.post('/recuperar', async (req,res) => {

    //extraindo os dados do formulário para criacao do usuario
    const {email, codigo} = req.body; 
    
    //Abre o bd (aqui estamos simulando com arquivo)
    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    //verifica se existe usuario com email    
    for (let user of usuariosCadastrados){
        if(user.email === email){

            if(user.token === codigo) {
                // Armazena o email na sessão
                req.session.lastEmail = email;
                
                const token = jwt.sign(user, process.env.TOKEN);
                return res.json({ "token" : token});

            } else {
                return res.status(422).send(`Usuario ou codigo incorretos.`);
            }
                
        }   
    }
    //Nesse ponto não existe usuario com email informado.
    return res.status(409).send(`Usuario com email ${email} não existe.`);

})

// Requisicao com POST publica para autenticar codigo de recuperacao
// e permitir recuperar e alterar senha
app.put('/recuperar-dois', async (req, res) => {
    const { novaSenha } = req.body;
  
    //Abre o bd (aqui estamos simulando com arquivo)
    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    // Recupera o último email armazenado na sessão
    const lastEmail = req.session.lastEmail || '';
    console.log('Last Email:', lastEmail);
  
    // Verifica se existe usuário com o último email armazenado
  
    for (let user of usuariosCadastrados){
        if(user.email === lastEmail){

            // Atualiza a senha do usuário com a nova senha
            const salt = await bcrypt.genSalt(10);
            const novaSenhaCrypt = await bcrypt.hash(novaSenha, salt);
            user.password = novaSenhaCrypt;
        
            // Limpa o último email armazenado na sessão após a alteração da senha
            req.session.lastEmail = null;

            // Altera o token 
            user.token = randomStringAsBase64Url(11);
        
            // Salva as alterações no "banco"
            fs.writeFileSync(jsonPath, JSON.stringify(usuariosCadastrados, null, 2));
        
            return res.send('Senha alterada com sucesso!');
                
        } 
    }

    // Usuário não encontrado com o último email armazenado.
    return res.status(409).send(`Usuário não encontrado.`);

});


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
    
    //gera um token único para cada usuário
    let token = randomStringAsBase64Url(11);

    //gerar uma senha cryptografada
    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(password,salt);

    //Criacao do user
    const user = new User(id, username, email, passwordCrypt, token);
    console.log(user);
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