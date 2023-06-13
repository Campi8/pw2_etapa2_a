//#region Declaraçoes
const express = require('express')
const exphbs = require('express-handlebars')

const session = require('express-session')// salvar na menoria login 
const FileStore = require('session-file-store')(session)//acesso binario = compilação arquivo
const flash = require('express-flash')//reservar espaço na memoria ram
const authRoutes = require('./routes/authRoutes')
//#endregion

//#region Setup da Aplicacao
const app = express()
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
//#endregion

//#region comunicar com o banco
const conn = require('./db/conn')
const Thought = require('./models/Thought')
const User = require('./models/User')
//#endregion

//#region Rotas de Controle
app.use('/', authRoutes)
//#endregion

//#region Controle de Sessão
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        saveUninitialized: false,

        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),

        cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now()+3600000),
            httpOnly: true
        }

    })
)

app.use(flash())

app.use((req, res, next) => {

    console.log(req.session.userId)

    if (req.session.userId) {
        res.locals.session = req.session
    }

    next()
})
//#endregion

conn
.sync()
.then(() => {
    app.listen(3000)
})
.catch((erro) => console.error(erro))
