const mongoose = require('mongoose');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const { JWTSecret } = require('../config/vars');

const User = mongoose.model('User');
const JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWTSecret,
};

const strategy = new JwtStrategy(JWTOptions, function(jwt_payload, next) {
  console.log('DEBUG: Payload Received: ', jwt_payload);
  console.log('DEBUG: jwt_payload.subject: ', jwt_payload.subject);

  User.findOne({ _id: jwt_payload.subject }, function(err, user) {
    console.log('DEBUG: ', user);
    if (err) {
      return next(null, false);
    }

    if (!user) {
      return next(null, false);

    } else {
      return next(null, user);
    }
  })
});

passport.use(strategy);
