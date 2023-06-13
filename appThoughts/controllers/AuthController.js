//importando modelo de dados da classe controladora, controlador que faz as ações
const User = require ('../models/User')

//encriptação
const bcrypt = require ('bcryptjs')

module.exports = class UserController {
    //metodo
    static login(req, res){
        res.render('auth/login') //renderiza no path
    }

    //metodo
    //faz a checagem
    static async loginPost(req, res){ 
        //obj constante informações que vao vir do front
        const {email, password} = req.body

        const user = await User.findOne({ where: {email: email}})

        if(!user) {
            res.render('auth/login',{
                message: 'Usuario não encontrado'
            })
            return
    }
        const passwordPatch = bcrypt.compareSync(password, user.password)

        if (!passwordPatch) {
            res.render('auth/login', {
                message: 'Senha Invalida'
            })
            return
        }

        req.session.userid = userid
        req.flash('message', 'Login Realizado com sucesso')

        req.session.save(() => {
            res.redirect('/')
        })
       

}

    static async register(req, res){
        res.render('auth/register')
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

        //criptografia, biblioteca, mecanica e chave
        const salt = bcrypt.genSalt(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        User.create(user)
        .then((user) => {
            req.session.userid = userid
            req.flash('message, Cadastro realizado com sucesso')
            req.session.save(() => {
                res.redirect('/')
            })

        })
            .catch((err) => console.error(err))

    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }
    
}