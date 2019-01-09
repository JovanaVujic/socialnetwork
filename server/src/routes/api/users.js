const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

//Load configurations
const messages = require('../../config/messages');
const init = require('../../config/init');

//Load models
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//Load validations
const signupValidation = require('../../validation/signup');
const loginValidation = require('../../validation/login');

//GET requests

//@route GET /api/users/current
//@desc GET current user route
//@access Private
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

//@route POST /api/users/signup
//@desc Register new users route
//@access Public
router.post('/signup', (req, res) => {
  
  //Validate form
  const { errors, isValid } = signupValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find user by username
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: messages.users.exist.username });
    } else {
      //Create new user with generated password hash
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

//@route POST /api/users/login
//@desc Login users route and returning jwt token
//@access Public
router.post('/login', (req, res) => {

  //Validate form
  const { errors, isValid } = loginValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find user by username
  User.findOne({ username: req.body.username, isDeleted: false }).then(user => {
    if (!user) {
      //User does not exist, show error
      return res.status(400).json({ username: messages.users.notexist.username });
    }

    //Check password
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
        //Incorrect password match, show error
        return res
          .status(400)
          .json({ password: messages.users.incorrect.password });
      }
    });
  });
});

module.exports = router;
