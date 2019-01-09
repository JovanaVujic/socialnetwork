const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//Set routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const friendships = require('./routes/api/friendships');
const album = require('./routes/api/album');

const app = express();

//Load Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Config database
const db = require('./config/init').mongoURI;
//Database connection
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Successfully connect to MongoDB'))
  .catch(err => console.log(err));

//Load Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/friendships', friendships);
app.use('/api/album', album);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
