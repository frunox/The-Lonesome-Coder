import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ModalProvider } from "./contexts/ModalContext"
import { PostProvider } from "./contexts/PostContext"
import PrivateRoute from "./components/auth/PrivateRoute"
import Home from "./pages/Home";
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage'
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword'
import UpdateProfile from './components/auth/UpdateProfile/UpdateProfile'
import AdminPage from './pages/AdminPage'
import AllPostsPage from './pages/AllPostsPage'
import AboutPage from './pages/AboutPage'
import PostPage from './pages/PostPage'
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <ModalProvider>
            <PostProvider>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={AboutPage} />
                <PrivateRoute path="/profile" component={ProfilePage} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute path='/admin' component={AdminPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/all-posts" component={AllPostsPage} />
                <Route path='/post/:id' render={props => <PostPage {...props} />} />
              </Switch>
            </PostProvider>
          </ModalProvider>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
