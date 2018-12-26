const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load User model
const Album = require('../../models/Album');
const upload = require('../../utils/upload');

const albumValidation = require('../../validation/album');

//GET requests

// @route GET /api/album
// @desc Get all images
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Album.find()
      .populate('user', ['name', 'username'])
      .then(album => res.json(album))
      .catch(err => res.json(err));
  }
);

// @route GET /api/album/user/:user_id
// @desc Get all images by user
// @access Private
router.get(
  '/user/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Album.findOne({ user: req.params.user_id })
      .then(album => res.json(album))
      .catch(err => res.json(err));
  }
);

//POST requests

// @route POST /api/album
// @desc Add image
// @access Private
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

    const { errors, isValid } = albumValidation(imageData);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Album.findOne({ user: req.user.id }).then(album => {
      if (!album) {
        new Album({
          user: req.user.id,
          images: [imageData]
        })
          .save()
          .then(album => res.json(album))
          .catch(err => res.status(400).json(err));
      } else {
        // Add image to album
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

// @route DELETE /api/album/:image_id
// @desc DELETE image by id
// @access Public
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
          console.log('filter');
          return res.status(404).json({ error: 'Image does not exist' });
        }

        // Get remove index
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
