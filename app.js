const express       = require('express')
const fs            = require('fs')
const morgan        = require('morgan')
const app           = express()
const bodyParser    = require('body-parser')
const port          = process.env.PORT || 8080
const router        = express.Router()
const postRouter    = require('./app/controllers/post.controller')

const accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' })

app.set('views', './app/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined', { stream: accessLogStream }))



router.get('/', (req, res) => {
    res.render('index', { header: 'index' })
})

app.use('/', router)
app.use('/posts', postRouter)

app.listen(port)
console.log('Server started on ' + port)
