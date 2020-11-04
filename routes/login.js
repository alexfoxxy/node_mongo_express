const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Логин',
        isLogin: true
    })
})

module.exports = router