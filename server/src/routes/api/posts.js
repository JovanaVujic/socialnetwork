const express = require('express');
const passport = require('passport');

const router = express.Router();

//Load models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//Load validation
const validatePostInput = require('../../validation/post');

//Load configurations
const upload = require('../../utils/upload');

//@route GET api/posts
//@desc  Get posts
//@access  Private
router.get('/',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  let friends = [];
    //Find friends of current user
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
        //Find all posts for friends
        Post.find({ user : { $in : friends }})
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ error: 'No posts found' }));
      })
      .catch(err => res.status(400).json(err));
});

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/:user_id',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  Post.find({ user: req.params.user_id })
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

//@route GET api/posts/:id
//@desc  Get post by id
//@access  Private
router.get('/:id',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

//@route POST api/posts
//@desc  Create post
//@access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  (req, res) => {

    //Validate form
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const postData = {};

    req.files.map(file => (postData.image = file.filename));

    //Create post object
    postData.text = req.body.text;
    postData.name = req.body.name;
    postData.avatar = req.body.avatar;
    postData.user = req.user.id;
    
    new Post(postData)
      .save()
      .then(post => res.json(post))
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Find profile by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          //Delete post
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

//@route  POST api/posts/like/:id
//@desc   Like post
//@access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Find profile by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Find profile by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          //Get post removed index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice out of array
          post.likes.splice(removeIndex, 1);

          //Save post
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

//@route   POST api/posts/comment/:id
//@desc    Add comment to post
//@access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  
    //Find post by Id
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add to comments array
        post.comments.unshift(newComment);

        //Save post
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    Remove comment from post
//@access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        //Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice comment out of array
        post.comments.splice(removeIndex, 1);

        //Save post
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;
