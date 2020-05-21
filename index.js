const express = require('express')
const app = express();
const path = require('path')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')
const coursesRoutes = require('./routes/courses')

//инициализация порта
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/cart', cartRoutes)
app.use('/courses', coursesRoutes)

//получение страницы


app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`)

})