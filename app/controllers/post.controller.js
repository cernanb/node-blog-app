const express     = require('express')
const app         = express()
const postRouter  = express.Router()
const Post        = require('../models/post')

// postRouter.params('id', req, res, next, id)

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
        Post.findById(req.params.id, (err, post) => {
            if (err) {
                console.log()
            }
            res.render('post/show', {
                header: 'post show', post
            })
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
        Post.findById(req.params.id, (err, post) => {
            if (err) throw err
            res.render('post/edit', {
                header: 'post edit', post
            })
        })
    })
    .put('/:id', (req, res) => {
        Post.update({ _id: req.query.id }, {title: req.query.title, description: req.query.description}, (err, post) => {
            if (err) return console.log(err)
            Post.findById(req.query.id, (err, post) => {
                if (err) console.log(err)
                res.redirect(`/posts/${post.id}`)
            })
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
