const mongoClient = require('mongodb').MongoClient;
 
mongoClient.connect('mongodb://localhost')
    .then(conn => global.conn = conn.db('Academia'))
    .catch(err => console.log(err))
  
function findAll() {
    return global.conn.collection('Atividades').find().toArray();
}
 
function insert(atividade) {
    return global.conn.collection('Atividades').insertOne(atividade);
}
 
function deleteOne(codigo) {
    return global.conn.collection('Atividades').deleteOne({ _id: codigo });
}

module.exports = { findAll, insert, deleteOne }