import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import './App.css';

import Header from './components/layout/Header';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Timeline from './components/timeline/Timeline';
import About from './components/timeline/About';
import Album from './components/timeline/Album';
import Friends from './components/timeline/Friends';
import MyNewsfeed from './components/newsfeed/MyNewsfeed';
import MyFriends from './components/newsfeed/MyFriends';
import Images from './components/newsfeed/Images';
import AddFriend from './components/friendship/AddFriend';
import BasicInfo from './components/profile/BasicInfo';
import WorkExperience from './components/profile/WorkExperience';
import Interests from './components/profile/Interests';
import Socials from './components/profile/Socials';
//Check for token

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute
                exact
                path="/timeline/:user_id"
                component={Timeline}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/timeline-album/:user_id"
                component={Album}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/timeline-about/:user_id"
                component={About}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/timeline-friends/:user_id"
                component={Friends}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/newsfeed" component={MyNewsfeed} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/newsfeed-friends"
                component={MyFriends}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/newsfeed-images" component={Images} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-friend" component={AddFriend} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/profile-basic" component={BasicInfo} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/profile-experience"
                component={WorkExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/profile-socials" component={Socials} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/profile-interests"
                component={Interests}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
