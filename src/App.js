import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ModalProvider } from "./contexts/ModalContext"
import PrivateRoute from "./components/auth/PrivateRoute"
import Home from "./pages/Home";
import Login from './components/auth/Login'
import Signup from './components/auth/Signup';
import ProfilePage from './pages/ProfilePage'
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword'
import UpdateProfile from './components/auth/UpdateProfile/UpdateProfile'
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <ModalProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/profile" component={ProfilePage} />
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
