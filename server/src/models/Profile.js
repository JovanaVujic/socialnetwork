const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  avatar: {
    type: String,
    default: '/images/default/avatar.jpg'
  },
  info: {
    type: String
  },
  workExperience: [
    {
      title: {
        type: String
      },
      company: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  interests: {
    type: [String]
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = profile = mongoose.model('profile', ProfileSchema);
