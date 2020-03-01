global.url = '/'

// requires
const express = require('express')
const app = express()
const session = require('express-session')
const Data = require('./middlewares/data')
// template engine
app.set('view engine', 'ejs')


// middlewares
app.use('/assets', express.static('public'))
app.use(session({
  secret: 'efhzfezfzefzefzihzevhzepghvzehca',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(require('./middlewares/flash'))

  
// routes
app.use('/connection', require('./middlewares/router/connection') )
app.use('/comment', require('./middlewares/router/comment') )
app.use('/administration', require('./middlewares/router/admin') )
app.use('/api', require('./middlewares/router/ajax') )

app.get('/', (req, res) => {
  let data = new Data('post', 'index')
  
  data.getData().then((data) => { 
    res.render('layout', data) 
  })
})

app.get('/viewCat/:slug', (req, res) => {

})

app.get('/post/:slug', (req, res) => {

})

app.get('/contact', (req, res) => {
  let data = new Data('contact', 'Contact')

  data.getData().then((data) => { 
    res.render('layout', data) 
  })
})

app.use((req, res) => {
  res.sendStatus(404)
})

// other
app.listen(8080)