const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());

const userController = require('./controllers/userController');
app.use('/', (req, res, next) => {
    console.log('middleware');
    let myStatusCode = userController.refresh(req, res);
    console.log('returned from refresh');

    if (!(myStatusCode === 200)) { //to do check. when not to call next (!res.headersSent)
        console.log('user is not logged in');
        next();
    }
})

app.use(express.static("public"))


const userRoutes = require('./routers/userRoutes');
app.use('/users', userRoutes);





// const recipeRoutes = require('./routes/recipeRoutes');
// app.use('/recipes', recipes);






// app.get('/', (req, res) => {
//     // res.send('welcome to my recipes website')
//     console.log('im main page? ');

// })

// app.get('/recipes', (req, res) => {
//     res.send('hi there sxtds')
// })
const port = 3121;

app.listen(`${port}`, () => {
    console.log(`Example app listening on port ${port}`)
})