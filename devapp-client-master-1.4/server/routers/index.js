const express = require('express');
const router = express.Router();
var passport = require('./passport');

router.get('/',(req,res)=>{
    res.render('login.html');
})


router.get('/login',(req,res)=>{
    res.render('login.html');
})

router.post('/login',
passport.authenticate('local',
{
    successRedirect:'/list.html',
    failureRedirect: '/',
    failureFlash:true, 
    failureFlash: 'Invalid username or passwerd.'
})
);

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login');
})


router.get('/transferhouse',isAuthenticated,(req,res)=>{
    res.render('transfer.html');
})


router.get('/list',isAuthenticated,(req,res)=>{
    res.render('list.html');
})

router.get('/user',(req,res)=>{
    res.render('user.html');
})

router.get('/blocks', (req,res)=>{
    res.render('socketTest.html');
})

router.get('/register',(req,res)=>{
    res.render('register.html');
})

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
