//#region Declaraçoes
const express = require('express')
const exphbs = require('express-handlebars')

const session = require('express-session')//login
const FileStore = require('session-file-store')(session)//acesso binario = compilação arquivo
const flash = require('express-flash')//reservar espaço na memoria ram
//#endregion

//#region setup da aplicacao
const app = express()
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
//#endregion

const conn = require('./db/conn')
const Thought = require('./models/Thought')
const User = require('./models/User')

conn
.sync()
.then(() => {
    app.listen(3000)
})
.catch((erro) => console.error(erro))

