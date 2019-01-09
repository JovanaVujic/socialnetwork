module.exports = {
  signup: {
    required: {
      name: {
        first: 'First name is required',
        last: 'Last name is required'
      },
      username: 'Username is required',
      password: 'Password is required',
      password2: 'Confirmed password is required'
    },
    length: {
      fullName: 'Full name must be between 2 and 30 characters',
      password: 'Password must be between 5 and 20 characters'
    },
    match: {
      password2: 'Passwords must match'
    }
  },
  login: {
    required: {
      username: 'Username is required',
      password: 'Password is required'
    }
  },
  users: {
    exist: {
      username: 'Username exists'
    },
    notexist: {
      username: 'Username does not exist'
    },
    incorrect: {
      password: 'Incorect password'
    }
  },
  profile: {
    required: {
      info: 'Info is required',
      interests: 'Interests is required'
    },
    length: {
      info: 'Personal information should be less than 300 charachters'
    },
    notexist: {
      profile: 'Profile does not exist',
      username: 'Username does not exist',
      user: 'User does not exist'
    },
    invalidurl: {
      youtube: 'Youtube URL is not a valid',
      facebook: 'Facebook URL is not a valid',
      twitter: 'Twitter URL is not a valid',
      instagram: 'Instagram URL is not a valid'
    }
  },
  profiles: {
    empty: 'There are no any profiles'
  },
  experience: {
    required: {
      title: 'Job title is required',
      company: 'Company is required',
      from: 'Date from is required',
      to: 'Date to is required'
    }, 
    greater: {
      dataFrom: 'Date To should be greater then Date From'
    }
  },
  posts: {
    notexist: {
      posts: 'There are no posts found',
      user: 'User does not exist',
      profile: 'Profile does not exist',
      comment: 'Comment does not exist'
    },
    like: 'You already liked this',
    unlike: 'You didnt like this',
    notauthorized: 'User not authorized',
    length: {
      post: 'Post must be between 5 and 300 characters'
    },
    required: {
      post: 'Text is required'
    }
  },
  album: {
    required: {
      image: 'Image is required',
      comment: 'Comment is required'
    },
    length: {
      comment: 'Comment must be less than 100 charachters'
    }
  }
};
