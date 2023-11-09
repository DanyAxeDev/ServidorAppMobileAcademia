var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    let valores = docs.map((item) => {
      return{
          codigo: item._id,
          horario: item.horario, 
          nome: item.nome,
          duracao: item.duracao,
          dia: item.dia
        }
    });
    res.send(valores);
  } catch (err) {
    res.send({ resultado: 'Erro ao Listar', mensagem: err });
  }
})

router.get('/users', async (req, res, next) => {
  try{
    const docs = await global.db.allUsers();
    let usuarios = docs.map((item) => {
      return{
        codigoUser: item._id,
        email: item.email,
        senha: item.senha
      }
    });
    res.send(usuarios);
  }catch(err){
    res.send({resultado: 'Erro ao recuperar usuarios', mensagem: err});
  }
})

router.post('/new', async (req, res, next) => {
  const _id = req.body.codigo;
  const horario = req.body.horario;
  const nome = req.body.nome;
  const duracao = req.body.duracao;
  const dia = req.body.dia
  try {
    const result = await global.db.insert({ _id, horario, nome, duracao, dia });
    res.send({ resultado: 'Inserido' });
  } catch (err) {
    res.send({ resultado: 'Erro ao Inserir', mensagem: err });
  }
})

router.post('/newuser', async (req, res, next) =>{
  const _id = req.body.codigoUser;
  const email = req.body.email;
  const senha = req.body.senha;
  try{
    const result = await global.db.addUser({_id, email, senha});
    res.send({resultado: 'Inserido novo usuário'});
  }catch(err){
    res.send({resultado: 'Erro ao inserir usuario', mensagem: err});
  }
})

router.delete('/remove/:codigo', async (req, res, next) => {
  const codigo = req.params.codigo;
  try {
    const result = await global.db.deleteOne(codigo);
    res.send({ resultado: 'Removido' });
  } catch (err) {
    res.send({ resultado: 'Erro ao Remover', mensagem: err });
  }
})

router.delete('/users/remove/:codigoUser', async(req, res, next) =>{
  const codigoUser = req.params.codigoUser;
  try{
    const result = await global.db.deleteUser(codigoUser);
    res.send({resultado: 'Usuario removido'});
  }catch(err){
    res.send({resultado: 'Erro ao remover usuario', mensagem: err});
  }
})

module.exports = router;
