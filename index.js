const express  = require('express');
const  {join}  = require('path');
const {create}  = require('express-handlebars');
const filesysRoutes = require ('./routes/router');




const PORT = process.env.PORT || 3000
const app = express()
const hbs = create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, 'public')))
app.use(express.static(join(__dirname, 'script')))
app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use(filesysRoutes);



async function start() {
  try {
    
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()


























