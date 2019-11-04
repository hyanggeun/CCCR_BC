const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('config');

passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(user, done) {
    done(null, user);
  });
 
passport.use(new LocalStrategy(
function(username, password, done) {
    console.log(username);
    console.log(password);
if (username && password && config.get('users').hasOwnProperty(username) && config.get('password') == password) {
    return done(null, {
    'id':username,
    'enrollId':config.get('users')[username].enrollId,
    'name':config.get('users')[username].name
    });
} else {
    return done(null, false);
}
}))
module.exports=passport;
