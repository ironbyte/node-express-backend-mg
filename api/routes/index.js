const express = require('express');
const passport = require('passport');

const userRoutes = require('./users.route');

const router = express.Router();

router.get('/', welcomeMessage);
router.get('/status', status);
router.use('/users', userRoutes);
router.get("/protected", passport.authenticate('jwt', { session: false }), protected );

module.exports = router;

function welcomeMessage(request, response, next) {
  response.status(200).json({
    message: 'TODO: Make a API doc HTML page'
  })
}

function status(request, response, next) {
  response.status(200).json({ message: {
    api_status: 'OK'
  }});
}

function protected (request, response, next) {
  console.log('request.user', request.user);
  response.status(200).json({
    message: "Success! You can not see this without a token",
    "request.user._id": request.user._id,
  });
}
