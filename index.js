const express = require('express')
const app = express();
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')
const coursesRoutes = require('./routes/courses')
const ordersRoutes = require('./routes/orders')
const mongoose = require('mongoose')
const User = require('./models/user')
const authRoutes = require('./routes/auth')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const varMiddleware = require('./middleware/variables')
const MONGODB_URI = `mongodb+srv://Donn:52m5a37jDtUDdugn@cluster0-u6m3d.mongodb.net/myshop`
//инициализация порта
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const store = new MongoStore({
    collection:'sessions',
    uri:MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret:'some secret value',
    resave:false,
    saveUninitialized:false,
    store
}))
app.use(varMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/cart', cartRoutes)
app.use('/courses', coursesRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)
//получение страницы

//pass = HlL94Lsde7f51C4x  52m5a37jDtUDdugn

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true,
            useUnifiedTopology: true,
        useFindAndModify:false})
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()