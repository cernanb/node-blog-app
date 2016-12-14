const express     = require('express')
const app         = express()
const postRouter  = express.Router()

postRouter
    .get('/', (req, res) => {
        res.render('post/index', { header: 'post index' })
    })
    .get('/new', (req, res) => {
        res.render('post/new', { header: 'post new' })
    })
    .get('/:id', (req, res) => {
        res.render('post/show', { header: 'post show', post: { id: 1, title: '1st Post', description: 'lorem ipsum' } })
    })
    .post('/', (req, res) => {
        console.log(req.body)
        res.redirect('/posts/1')
    })
    .get('/:id/edit', (req, res) => {
        res.render('post/edit', { header: 'post edit', post: { id: 1, title: '1st Post', description: 'lorem ipsum' } })
    })
    .put('/:id', (req, res) => {
        console.log(req.body)
        res.redirect('/posts/1')
    })
    .delete('/:id', (req, res) => {
        console.log('deleting stuff')
    })

module.exports = postRouter
