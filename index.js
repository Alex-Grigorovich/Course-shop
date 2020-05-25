const express = require('express')
const app = express();
const path = require('path')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')
const coursesRoutes = require('./routes/courses')
const mongoose = require('mongoose')

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


//инициализация порта
const PORT = process.env.PORT || 5000;
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
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

//pass = HlL94Lsde7f51C4x

async function start() {
    try {
        const url = `mongodb+srv://Dan:HlL94Lsde7f51C4x@cluster0-u6m3d.mongodb.net/myshop`
        await mongoose.connect(url, {useNewUrlParser: true,
            useUnifiedTopology: true})
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()