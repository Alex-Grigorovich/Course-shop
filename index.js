const express = require('express')
const app = express();
const path = require('path')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')
const coursesRoutes = require('./routes/courses')
const mongoose = require('mongoose')
const User = require('./models/user')

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


//инициализация порта
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next)=>{
    try{
        const user = await User.findById('5ecd6a50c2bbc340c3fe743b')
        req.user = user
        next()
    }catch (e) {
        console.log(e)
    }

})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/cart', cartRoutes)
app.use('/courses', coursesRoutes)

//получение страницы

//pass = HlL94Lsde7f51C4x  52m5a37jDtUDdugn

async function start() {
    try {
        const url = `mongodb+srv://Donn:52m5a37jDtUDdugn@cluster0-u6m3d.mongodb.net/myshop`
        await mongoose.connect(url, {useNewUrlParser: true,
            useUnifiedTopology: true,
        useFindAndModify:false})
        const candidate =await User.findOne()
        if(!candidate){
            const user = new User({
                email:'holdencolfield37@gmail.com',
                name:'Oleg',
                cart:{items:[]}
            })
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()