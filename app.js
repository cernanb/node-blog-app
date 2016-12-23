const express        = require('express')
const fs             = require('fs')
const morgan         = require('morgan')
const app            = express()
const methodOverride = require('method-override')
const bodyParser     = require('body-parser')
const port           = process.env.PORT || 8080
const router         = express.Router()
const postRouter     = require('./app/controllers/post.controller')
const mongoose       = require('mongoose')
mongoose.connect('mongodb://localhost/blogApp')

const db = mongoose.connection

const accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' })

app.set('views', './app/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined', { stream: accessLogStream }))
app.use(methodOverride('_method'))

router.use( function( req, res, next ) {
    if ( req.query._method == 'DELETE' ) {
        req.method = 'DELETE';
        req.url = req.path;
    }
    // } else if ( req.query._method === 'PUT' ) {
    //     console.log("params: ",req.query)
    //     req.method = 'PUT';
    //     req.url = req.path;
    // }
    next();
})

router.get('/', (req, res) => {
    console.log(db)
    res.render('index', { header: 'index' })
})

app.use('/', router)
app.use('/posts', postRouter)

app.listen(port)
console.log('Server started on ' + port)
