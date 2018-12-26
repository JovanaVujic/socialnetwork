const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  images: [
    {
      image: {
        type: String
      },
      comment: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Album = mongoose.model('album', AlbumSchema);
