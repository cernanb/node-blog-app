const express     = require('express')
const app         = express()
const postRouter  = express.Router()

postRouter
    .get('/', (req, res) => {
        res.render('post/index', { header: 'post index'} )
    })
    .get('/new', (req, res) => {
        res.render('post/new', { header: 'post new' } )
    })

module.exports = postRouter
