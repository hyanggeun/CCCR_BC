/*
 * Fabric Client Sample Application
 */
const http = require('http');
const express = require('express');
let app = express();
let server = http.createServer(app);


const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

let routers = require('./server/routers/index');
let apiRouters = require('./server/routers/api/api');


app.use(favicon(path.join(__dirname, 'public/css', 'ca@2x.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cookieParser());
app.use(session({resave: 'false', saveUninitialized: 'true',
  secret: 'keyboard cat', cookie: { expire: 0}}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname+'/public'));


app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/api',apiRouters);
app.use('/', routers);

server.listen(3000,()=>{
    console.log("Server starting on 3000");
});
