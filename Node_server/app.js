
const dbConnection =  require("./dbConnection/dbConnectin")
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/user',require('./controllers/users'));
app.use('/customer',require('./controllers/customer'));
app.use('/product',require('./controllers/products'));
app.use('/transaction',require('./controllers/transactions'));

app.listen(process.env.port || 3000);
console.log('Web Server is listening at port '+ (process.env.port || 3000));