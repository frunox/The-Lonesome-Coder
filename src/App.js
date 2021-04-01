import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ModalProvider } from "./contexts/ModalContext"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./pages/Home";
import Login from './components/Login'
import Signup from './components/Signup';
import Profile from './pages/Profile'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <ModalProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </ModalProvider>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
