import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ModalProvider } from "./contexts/ModalContext"
import PrivateRoute from "./components/auth/PrivateRoute"
import Home from "./pages/Home";
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage'
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword'
import UpdateProfile from './components/auth/UpdateProfile/UpdateProfile'
import AdminPage from './pages/AdminPage'
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
              <PrivateRoute path='/admin' component={AdminPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </ModalProvider>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
