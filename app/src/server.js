const express = require('express');
const routes = require("./routes.js");
const port = 5001;
let path = require('path')
let app = express();

app.use(express.json())

app.use(express.static(path.join(__dirname, '../public')));
app.use('/public/js', express.static(path.join(__dirname, '../public/js')));
app.use('/public/css', express.static(path.join(__dirname, '../public/css')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', "./views");
app.use('/', routes);
app.listen(port);