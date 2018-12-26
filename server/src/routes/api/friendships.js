const express = require('express');
const router = express.Router();
const passport = require('passport');
// Load models
const Friendship = require('../../models/Friendship');

//GET requests

// @route GET /api/friendships/akk
// @desc GET all friendship for current user
// @access Private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Friendship.find({
      $or: [{ fromUser: req.user.id }, { toUser: req.user.id }]
    })
      .then(friendships => res.json(friendships))
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

// @route GET /api/friendships/friends
// @desc GET friends for current user
// @access Private
router.get(
  '/friends',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Friendship.find({
      $or: [{ fromUser: req.user.id }, { toUser: req.user.id }],
      status: 'ACCEPTED'
    })
      .then(friendships => res.json(friendships))
      .catch(err => res.status(400).json(err));
  }
);

// @route GET /api/friendships/user/:user_id
// @desc GET friends by user
// @access Private
router.get(
  '/friends/user/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Friendship.find({
      $or: [{ fromUser: req.params.user_id }, { toUser: req.params.user.id }],
      status: 'ACCEPTED'
    })
      .then(friendships => res.json(friendships))
      .catch(err => res.status(400).json(err));
  }
);

//POST requests
// @route POST /api/friendships/user/:user_id/status/:status
// @desc Friendship route
// @access Private
router.post(
  '/user/:user_id/status/:status',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const fromUser = (actionUser = req.user.id);
    const toUser = req.params.user_id;
    const status = req.params.status;

    switch (status) {
      case 'DELETE':
        Friendship.findOneAndDelete({
          $or: [{ fromUser, toUser }, { fromUser: toUser, toUser: fromUser }]
        })
          .then(friendship => {
            Friendship.find({
              $or: [{ fromUser: actionUser }, { toUser: actionUser }]
            }).then(friendships => res.status(200).json(friendships));
          })
          .catch(err => res.status(400).json(err));
        break;
      case 'REQUESTED':
        new Friendship({
          fromUser,
          toUser,
          status,
          actionUser
        })
          .save()
          .then(friendhip => {
            Friendship.find({
              $or: [{ fromUser: actionUser }, { toUser: actionUser }]
            }).then(friendships => res.status(200).json(friendships));
          })
          .catch(err => {
            res.status(400).json(err);
          });
        break;
      default:
        Friendship.findOneAndUpdate(
          {
            $or: [{ fromUser, toUser }, { fromUser: toUser, toUser: fromUser }]
          },
          { $set: { status, actionUser } },
          { new: true }
        )
          .then(friendship => {
            Friendship.find({
              $or: [{ fromUser: actionUser }, { toUser: actionUser }]
            }).then(friendships => res.status(200).json(friendships));
          })
          .catch(err => res.status(400).json(err));
    }
  }
);

module.exports = router;
