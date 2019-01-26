const express = require('express');
const passport = require('passport');

const router = express.Router();

//Load configurations and utils
const messages = require('../../config/messages');
const upload = require('../../utils/upload');

//Load models
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Friendship = require('../../models/Friendship');

//Load validations
const basicInfoValidation = require('../../validation/basicInfo');
const experienceValidation = require('../../validation/experience');
const socialsValidation = require('../../validation/socials');



//GET requests

//@route GET /api/profile
//@desc GET profile for current user route
//@access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Find profile by id
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'username', 'isDeleted'])
      .then(profile => {
        if (!profile) {
          return res
            .status(400)
            .json({ profile: messages.profile.notexist.profile });
        }
        res.json(profile);
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  }
);

//@route GET /api/profile/user/:user_id
//@desc Get profile by user_id route
//@access Public
router.get('/user/:user_id', passport.authenticate('jwt', { session: false }),
(req, res) => {
  //Find profile by id
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'username', 'isDeleted'])
    .then(profile => {
      if (!profile) {
        return res
          .status(400)
          .json({ error: messages.profile.notexist.profile });
      }
      return res.json(profile);
    });
});

//@route GET api/profile/all
//@desc  Get all profiles
//@access Private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Find all profile except current
    Profile.find({ user: { $ne: req.user.id } })
      .populate('user', ['name', 'username', 'isDeleted'])
      .then(profiles => {
        if (!profiles) {
          return res.status(404).json({ error: messages.profiles.empty });
        }

        res.json(profiles);
      })
      .catch(err =>
        res.status(404).json({ error: messages.profiles.empty })
      );
  }
);

//@route GET /api/profile/friends
//@desc GET profiles friends for current user
//@access Private
router.get(
  '/friends',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let friends = null;
    //Find friends for current user
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
        if (friends != null) {
          //Find profiles for user`s friends
          Profile.find({ user : { $in : friends }})
              .populate('user', ['name', 'isDeleted'])
              .then(profiles => res.json(profiles))
              .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => res.status(400).json(err));
  }
);

//@route GET /api/profile/friends/id
//@desc GET profiles friends for current user
//@access Private
router.get(
  '/friends/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let friends = null;

    //Find friends for current user
    Friendship.find({
      $or: [{ fromUser: req.params.user_id }, { toUser: req.params.user_id }],
      status: 'ACCEPTED'
    })
      .then(friendships => {
        if (friendships != null) {
          friends = friendships.map(f => f.fromUser == req.params.user_id ? f.toUser : f.fromUser);
          return friends;
        }
      }).then(friends => {
        if (friends != null) {
          //Find profiles for user`s friends
          Profile.find({ user : { $in : friends }})
              .populate('user', ['name', 'isDeleted'])
              .then(profiles => res.json(profiles))
              .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => res.status(400).json(err));
  }
);

//POST requests

//@route POST /api/profile
//@desc Create/Edit profile route
//@access Private
router.post(
  '/basic-info',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  (req, res) => {
    const profileData = {};
    
    //Validate form
    const { errors, isValid } = basicInfoValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    req.files.map(file => (profileData.avatar = file.filename));

    profileData.user = req.user.id;

    if (req.body.info) profileData.info = req.body.info;

    //Find profile by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Profile update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileData },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.json(err));
      } else {
        //Profile create
        new Profile(profileData)
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            res.status(400).json(err);
          });
      }
    });
  }
);

//@route POST /api/profile/experience
//@desc Add profile experience route
//@access Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Validate form
    const { errors, isValid } = experienceValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Create new experience object
    const newExperience = {
      title: req.body.title,
      company: req.body.company,
      from: req.body.from,
      to: req.body.to
    };

    //Find profile by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Add new experience to existing profile
        profile.workExperience.unshift(newExperience);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.json(err));
      } else {
        //Profile create and add new Experience
        const profileData = {};
        profileData.workExperience = [...new Set(newExperience)];

        new Profile(profileData)
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            res.status(400).json(err);
          });
      }
    });
  }
);

//@route POST /api/profile/socials
//@desc Add profile socials route
//@access Private
router.post(
  '/socials',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Validate form
    const { errors, isValid } = socialsValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileData = {};

    //Create socials object
    profileData.social = {};
    if (req.body.youtube) profileData.social.youtube = req.body.youtube;
    if (req.body.facebook) profileData.social.facebook = req.body.facebook;
    if (req.body.twitter) profileData.social.twitter = req.body.twitter;
    if (req.body.instagram) profileData.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Profile update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileData },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.json(err));
      } else {
        //Profile create
        new Profile(profileData)
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            res.status(400).json(err);
          });
      }
    });
  }
);

//@route POST /api/profile/interests
//@desc Add profile interests route
//@access Private
router.post(
  '/interests',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileData = {};

    //Create interests object
    profileData.interests = [];

    if (typeof req.body.interests !== undefined) {
      profileData.interests = [...new Set(req.body.interests)];
    }

    //Find profile by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Profile update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileData },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.json(err));
      } else {
        //Profile create
        new Profile(profileData)
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            res.status(400).json(err);
          });
      }
    });
  }
);

//@route DELETE /api/profile/experience/:exp_id
//@desc Delete experience route
//@access Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        const removeIndex = profile.workExperience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        profile.workExperience.splice(removeIndex, 1);

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.json(err));
      }
    });
  }
);

//DELETE requests

//@route DELETE /api/profile
//@desc Delete user and profile route
//@access Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Find profile and remove it
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        //Find user and set delete flag to true
        User.findOneAndUpdate({ _id: req.user.id })
          .then(user => {
            if (!user) {
              return res
                .status(400)
                .json({ error: messages.profile.notexist.user });
            }
            user.isDeleted = true;
            user
              .save()
              .then(user => res.json(user))
              .catch(err => res.json(err));
          })
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
