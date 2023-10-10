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
          duracao: item.duracao
        }
    });
    res.send(valores);
  } catch (err) {
    res.send({ resultado: 'Erro ao Listar', mensagem: err });
  }
})

router.post('/new', async (req, res, next) => {
  const _id = req.body.codigo;
  const horario = req.body.horario;
  const nome = req.body.nome;
  const duracao = req.body.duracao;
  try {
    const result = await global.db.insert({ _id, horario, nome, duracao });
    res.send({ resultado: 'Inserido' });
  } catch (err) {
    res.send({ resultado: 'Erro ao Inserir', mensagem: err });
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

module.exports = router;
