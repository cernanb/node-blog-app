const express     = require('express')
const app         = express()
const postRouter  = express.Router()
const Post        = require('../models/post')

// postRouter.params('id', req, res, next, id)

postRouter.param('id', (req, res, next, id) => {
    if ( req.query._method == 'PUT' ) {
        return next()
    }
    Post.findById(id)
        .then((post) => {
            req.post = post
            next()
        })
})

postRouter
    .get('/', (req, res) => {
        Post.find((err, posts) => {
            if (err) {
                res.render("There was an issue getting the collections of posts")
            }
            res.render('post/index', { header: 'post index', posts})
        })
    })
    .get('/new', (req, res) => {
        res.render('post/new', { header: 'post new' })
    })
    .get('/:id', (req, res) => {
        const post = req.post
        res.render('post/show', {
            header: 'post show', post
        })
    })
    .post('/', (req, res) => {
        Post.create(req.body)
            .then((post) => {
                res.redirect(`/posts/${post.id}`)
            })
            .catch((error) => {
                res.redirect('/posts/new')
            })
    })
    .get('/:id/edit', (req, res) => {
        const post = req.post
        res.render('post/edit', {
            header: 'post edit', post
        })
    })
    .put('/:id', (req, res) => {
        Post.findByIdAndUpdate(req.params.id, {title: req.body.title, description: req.body.description}, (err, post) => {
            if (err) return console.log(err)
            res.redirect(`/posts/${post.id}`)
        })
    })
    .delete('/:id', (req, res) => {
        Post.remove({ _id: req.params.id }, (err, post) => {
            if (err) return console.log(err)
            console.log('Item has been deleted')
            res.redirect('/posts')
        })
    })

module.exports = postRouter
