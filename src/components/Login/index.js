import React, { useRef, useState } from "react";
import { Confirm } from 'semantic-ui-react'
import { useAuth } from "../../contexts/AuthContext"
import { useHistory, Link } from "react-router-dom";
import './Login.css'

const Login = () => {
  // const displaynameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [state, setState] = useState({ open: false })

  async function handleSubmit(e) {
    e.preventDefault()

    // the loading state is set to disable the button so only 1 account is created
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  const closeConfirm = () => {
    setState({ open: false })
  }

  return (
    <div className='login-background'>
      <div className='wrapper'>
        <div className='form-wrapper'>
          <div className='login-form-outline'>
            <h1>Log In</h1>
            {error &&
              <Confirm
                open={state.open}
                onConfirm={closeConfirm}
                content={error}
                size='tiny'
              />
            }
            <form className='form' onSubmit={handleSubmit}>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  ref={emailRef}
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  ref={passwordRef}
                  placeholder="Password"
                  type="password"
                  name="password"
                  required
                  pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
                />
              </div>
              <div className="createAccount">
                <button disabled={loading} type="submit">Log In</button>
              </div>
              <div className="signup-login">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </form>
          </div>
          <div className="signup-login">
            Already have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
