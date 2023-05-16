const express = require('express')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine','handlebars')
const approved = false;

app.post('/verifyuser', (req, res) =>{
    const form ={
        nome:req.body.name,
        idade:req.body.age
    }

    if(form.nome =='lindo' && form.age == 22){
        approved = true;

    }else{
        approved = false;
    }
    res.send(approved)
})


app.get('/', function(req, res){
    const user ={
        name: "Gustavo",
        surname: "Campi",
        age: 22
    }


    res.render('home', {user:user, auth:approved, approved})
})

app.get('/dashboards', function(req, res){
    res.render('dashboards')
})

app.listen(3000)