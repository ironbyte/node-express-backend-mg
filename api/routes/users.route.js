const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');

router.post('/register', register);
router.post('/authenticate', authenticateUser);
router.get('/current', passport.authenticate('jwt', { session: false }), currentUser);

module.exports = router;

async function register (request, response, next) {
  try {
    const email = request.body.user.email;
    const name = request.body.user.name;
    const password = request.body.user.password;

    if (!name) {
      return response.status(400).json({
        errors: {
          status: 'name is required',
        },
      });
    }

    if (!email) {
      return response.status(400).json({
        errors: {
          status: 'email is required',
        },
      });
    }

    if (!password) {
      return response.status(400).json({
        errors: {
          status: 'password is required',
        },
      });
    }

    const newUser = new User(request.body.user);
    const savedUser = await newUser.save();

    response.status(200).json({
      message: `${savedUser.name} has been successfully registered`,
    });

  } catch (error) {
    return next (error);
  }
}

async function authenticateUser (request, response, next) {
  try {
    const email = request.body.user.email;
    const password = request.body.user.password;

    const user = await User.findOne({ email });
    // console.log("User.findOne({ email })", user);

    if (!user) {
      response.status(401).json({
        message: 'Email or password is incorrect',
      });
    } else {
      user.verifyPasswordv2(password).then((match) => {
        if (match) {
          // console.log('verifyPasswordv2 -> match', match);
          response.status(200).json(user.getJWTAccessToken());
        } else {
          response.status(401).json({
            message: 'Email or password is incorrect',
          });
        }
      })
    }
  } catch (error) {
    return next(error);
  }
}

async function currentUser (request, response, next) {
  try {
    const email = request.user.email;
    const user = await User.findOne({ email });

    response.status(200).json(user.toPlainJSON());

  } catch (error) {
    return next(error);
  }
}
