const express = require('express');
const res = require('express/lib/response');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;

//routes
const productsRouter = require('./routers/products');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const categoriesRouter = require('./routers/categories');
const req = require('express/lib/request');

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/categories`, categoriesRouter);


//const Product = require('./models/product');
//const Order = require('./models/order');
//const User = require('./models/user');
//const Category = require('./models/category');

//database
// using mongoose to connect string
mongoose.connect(process.env.CONNECTION_STRING, {
    //userNewUrlParser: true,
    //userUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log("Database Connection is ready..")
})
.catch((err)=>{
    console.log(err);
})

//server
// app.listen(3000,() =>{
//
//     console.log('server is running http://locationhost:3000')
// })

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express is working on port" + port)
})
