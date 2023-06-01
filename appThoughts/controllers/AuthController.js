//importando modelo de dados da classe controladora, controlador que faz as ações
const User = require ('../models/User')

//encriptação
const bcrypt = require ('bcryptjs')

module.exports = class UserController {
    //metodo
    static login(req, res){
        res.render('auth/login')
    }

    //metodo
    static async loginPost(req, res){
        //obj constante informações que vao vir do front
        const {email, password} = req.body
    }

    //metodo
    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body
        
        //confirmação da senha
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não são iguas, digite a senha novamente')
            res.render("auth/register")

            return
        }

        //verificar se o email existe, se ele existe vai para o login, se não existir
        //vai para o cadastro 
        const checkIfUserExist = await User.findOne({where: {email:email}})


        if (checkIfUserExist) {
            req.flash('message', 'O email ja esta registrado')
            res.render('auth/register')

            return
        }
    }

}