const express = require('express');
const path = require('path');
const layout = require('express-layout');
const routes = require('./routes');
const bodyParser = require('body-parser');
const port = process.env.PORT || 1000;

const app = express();


// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', '.ejs');

const middlewares =[
    layout(),
    express.static(path.join(__dirname, 'public')),
    bodyParser.urlencoded({ extended: false })
]

app.use(middlewares);
app.use('/', routes);

app.listen(port, function()
{
    console.log('App  running at http://localhost:' + port);
});