const express = require('express');
const fs = require('fs');
const exphtbs = require('express-handlebars')
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const homeRoutes = require('./routes/home');
const loginRoutes = require('./routes/login');
const User = require('./models/users')

const hbs = exphtbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)

app.set('view engine', 'hbs') // регистрация движка
app.set('views', 'views') // региистрация 

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5fa2f7e4a3453a3f2c82427b');
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
    }

})
app.use(express.static('public')) // использование стилей в папке public
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes) // исползоание роута главной страницы
app.use('/login', loginRoutes) // исползоание роута главной страницы

/*
app.get('/', (req, res) => {
    // res.status(200)
    // res.render('index', {
    //     title: 'Главная',
    //     isHome: true
    // })
})*/

/*app.get('/login', (req, res) => {
    res.status(200)
    res.render('login', {
        title: 'Логин',
        isLogin: true
    })
})*/

const PORT = process.env.PORT || 3000

// Подключение к монго ДБ
async function start() {
    try {
        const url = ``;
        await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })

        const candidate = User.findOne()
        // {}
        if (!candidate) {
            const user = new User({
                username: 'Test',
                email: 'test@test.ru',
                password: 'qwerty1234'
            })
            await user.save()
        }


        app.listen(PORT, () => {
            console.log(`Server run on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

