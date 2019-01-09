const express = require('express');
const passport = require('passport');

const router = express.Router();

//Load models
const Album = require('../../models/Album');
const upload = require('../../utils/upload');

//Load validation
const albumValidation = require('../../validation/album');

//GET requests

//@route GET /api/album
//@desc Get all images
//@access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let friends = [];
    
    //Find friend for current user
    Friendship.find({
      $or: [{ fromUser: req.user.id }, { toUser: req.user.id }],
      status: 'ACCEPTED'
    })
      .then(friendships => {
        if (friendships != null) {
          friends = friendships.map(f => f.fromUser === req.user.id ? f.toUser : f.fromUser);
          return friends;
        }
      }).then(friends => {
         friends.push(req.user.id);
         //Find albums of current user`s friends
         Album.find({ user : { $in : friends }})
            .populate('user', ['name', 'username', 'isDeleted'])
            .then(album => res.json(album))
            .catch(err => res.json(err));
      })
      .catch(err => res.status(400).json(err));
  }
);

//@route GET /api/album/user/:user_id
//@desc Get all images by user
//@access Private
router.get(
  '/user/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //find album by user
    Album.findOne({ user: req.params.user_id })
      .then(album => res.json(album))
      .catch(err => res.json(err));
  }
);

//POST requests

//@route POST /api/album
//@desc Add image
//@access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  (req, res) => {
    const imageData = {};

    req.files.map(file => {
      if (file.fieldname === 'image') {
        imageData.image = file.filename;
      }
    });
    imageData.comment = req.body.comment;

    //Validate form
    const { errors, isValid } = albumValidation(imageData);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Find album for current user
    Album.findOne({ user: req.user.id }).then(album => {
      if (!album) {
        //Create album and add image
        new Album({
          user: req.user.id,
          images: [imageData]
        })
          .save()
          .then(album => res.json(album))
          .catch(err => res.status(400).json(err));
      } else {
        //Add image to existing album
        album.images.unshift(imageData);
        album
          .save()
          .then(album => res.json(album))
          .catch(err => res.status(400).json(err));
      }
    });
  }
);

//Delete methods

//@route DELETE /api/album/:image_id
//@desc DELETE image by id
//@access Private
router.delete(
  '/:image_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Album.findOne({ user: req.user.id })
      .then(album => {
        if (!album) {
          return res.status(400).json({ errror: 'No image' });
        }

        if (
          album.images.filter(
            image => image._id.toString() === req.params.image_id
          ).length === 0
        ) {
          return res.status(404).json({ error: 'Image does not exist' });
        }

        //Get remove index
        const removeIndex = album.images
          .map(item => item._id.toString())
          .indexOf(req.params.image_id);

        // Splice comment out of array
        album.images.splice(removeIndex, 1);

        album.save().then(album => res.json(album));
      })
      .catch(err => res.status(404).json({ error: 'Album not found' }));
  }
);

module.exports = router;
