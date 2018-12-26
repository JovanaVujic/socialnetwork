const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const messages = require('../../config/messages');
const init = require('../../config/init');

//Load User model
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// Load validation
const signupValidation = require('../../validation/signup');
const loginValidation = require('../../validation/login');

//GET requests

// @route GET /api/users/current
// @desc GET current user route
// @access Private
router.get('/current', passport.authenticate('jwt'), (req, res) => {
  res.json({
    id: req.user.id,
    name: {
      first: req.user.first,
      last: req.user.last
    },
    username: req.user.username
  });
});

//POST requests

// @route POST /api/users/signup
// @desc Sign up new user route
// @access Public
router.post('/signup', (req, res) => {
  //Validate signup form
  const { errors, isValid } = signupValidation(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find User by username
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: messages.users.exist.username });
    } else {
      // Generate password hash
      const newUser = new User({
        name: {
          first: req.body.name.first,
          last: req.body.name.last
        },
        username: req.body.username,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) res.status(400).json(err);
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              //Create empty profile for this user
              new Profile({
                user: user.id
              })
                .save()
                .then(profile => res.json(user))
                .catch(err => console.log(err));
            })
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
});

// @route POST /api/users/login
// @desc Login users route / Returning jwt token
// @access Public
router.post('/login', (req, res) => {
  //Validate login form
  const { errors, isValid } = loginValidation(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  // Find User by username
  User.findOne({ username: req.body.username }).then(user => {
    // Check user
    if (!user) {
      return res
        .status(400)
        .json({ username: messages.users.notexist.username });
    }

    // Check password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // Sign token
        const payload = {
          id: user.id,
          name: {
            first: user.name.first,
            last: user.name.last
          },
          username: user.username
        };

        jwt.sign(
          payload,
          init.secretOrPrivateKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({ success: true, token: init.token + token });
          }
        );
      } else {
        return res
          .status(400)
          .json({ password: messages.users.incorrect.password });
      }
    });
  });
});

module.exports = router;
