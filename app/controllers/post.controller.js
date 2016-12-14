const express     = require('express')
const app         = express()
const postRouter  = express.Router()
const Post        = require('../models/post')

// postRouter.params('id', req, res, next, id)

postRouter
    .get('/', (req, res) => {

        res.render('post/index', { header: 'post index' })
    })
    .get('/new', (req, res) => {
        res.render('post/new', { header: 'post new' })
    })
    .get('/:id', (req, res) => {
        Post.findById(req.params.id, (err, post) => {
            if (err) throw err
            res.render('post/show', {
                header: 'post show', post
            })
        })

    })
    .post('/', (req, res) => {
        Post.create(newPost)
            .then((post) => {
                res.redirect(`/posts/${post.id}`)
            })
            .catch((error) => {
                res.redirect('/posts/new')
            })
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
