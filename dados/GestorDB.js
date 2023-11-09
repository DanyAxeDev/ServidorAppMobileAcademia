
const mongoClient = require('mongodb').MongoClient;
 
mongoClient.connect('mongodb://localhost')
    .then(conn => global.conn = conn.db('Academia'))
    .catch(err => console.log(err))
  
function findAll(diaSemana) {
    if (diaSemana) {
        return global.conn.collection('Atividades').find({ diaSemana }).toArray();
    } else {
        return global.conn.collection('Atividades').find().toArray();
    }
}
 
function insert(atividade) {
    return global.conn.collection('Atividades').insertOne(atividade);
}
 
function deleteOne(codigo) {
    return global.conn.collection('Atividades').deleteOne({ _id: codigo });
}

function allUsers(){
    return global.conn.collection('Users').find().toArray();
}

function addUser(user){
    return global.conn.collection('Users').insertOne(user);
}

function deleteUser(_id){
    return global.conn.collection('Users').deleteOne({_id: codigoUser})
}

module.exports = { findAll, insert, deleteOne, allUsers, addUser, deleteUser }