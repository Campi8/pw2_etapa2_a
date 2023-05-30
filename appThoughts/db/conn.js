//sequelize  biblioteca de conexao mysql com node || urm, no models são as classes
//upperCase e chave,  chamando a classe do sequelize, o objeto sequelize, colocando a classe no pack
//orientando a objeto não a packs

const {Sequelize} = require('sequelize')

//vazio traz sem executar parametro
const sequelize = new Sequelize('thoughts', 'root', '123456',{
    host:'127.0.1', //localhost
    dialect:'mysql'
});

//externo usa try, interno poderia ser promisses
try{
    sequelize.authenticate()
    console.info('Conectado ao serviço de dadso')

} catch(error){
    console.error('Não conectamos ao serviço de dados =>', error)
}

module.exports = sequelize