const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', 'views');

// const userController = require('./controllers/userController');
// app.use('/', (req, res, next) => {
//     console.log('middleware');
//     let myStatusCode = userController.refresh(req, res);
//     console.log('returned from refresh');

//     if (!(myStatusCode === 200)) { //to do check. when not to call next (!res.headersSent)
//         console.log('user is not logged in');
//         next();
//     }
// })

app.use(express.static(path.join(__dirname, 'public')));

const homeRoutes = require('./routes/home-routes');
app.get('/', homeRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const recipesRoutes = require('./routes/recipes-routes');
app.use('/', recipesRoutes);



const port = 3121;

app.listen(`${port}`, () => {
    console.log(`Example app listening on port ${port}`)
})