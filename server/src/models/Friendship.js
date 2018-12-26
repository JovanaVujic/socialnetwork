const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendshipSchema = Schema({
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  toUser: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  actionUser: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//FriendshipSchema.index({ users: 1 }, { unique: true });
module.exports = Friendship = mongoose.model('friendships', FriendshipSchema);
