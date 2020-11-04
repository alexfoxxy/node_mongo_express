const { Router } = require('express')
const MediaFiles = require('../models/media')
const router = Router()

router.get('/', (req, res) => {
    res.status(200)
    res.render('index', {
        title: 'Главная',
        isHome: true
    })
})

router.post('/', async (req, res) => {
    //console.log(req.body)
    //const media = new MediaFiles(req.body.date, req.body.url, req.body.path_file)
    const media = new MediaFiles({
        date: req.body.date,
        path_file: req.body.path_file,
        userId: req.user.userId
    })

    try {
        await media.save()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }


})

module.exports = router