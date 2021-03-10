import React, { useRef, useState } from "react";
import { Confirm } from 'semantic-ui-react'
import { useAuth } from "../../contexts/AuthContext"
import { useHistory, Link } from "react-router-dom";
import './Signup.css'

const Signup = () => {
  // const displaynameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [state, setState] = useState({ open: false })


  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match")
      setState({ open: true })
      return
    }

    // the loading state is set to disable the button so only 1 account is created
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  const closeConfirm = () => {
    setState({ open: false })
  }

  return (
    <div className='signup-background'>
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h1>Sign Up</h1>
          {error &&
            <Confirm
              open={state.open}
              onConfirm={closeConfirm}
              content={error}
              size='tiny'
            />
          }
          <form onSubmit={handleSubmit}>
            {/* <div className="display-name">
              <label htmlFor="displayName">Display Name</label>
              <input
                ref={displaynameRef}
                placeholder="display name"
                type="text"
                name="displayName"
                required
              />
            </div> */}
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
            <div className="password-confirm">
              <label htmlFor="password">Confirm Password</label>
              <input
                ref={passwordConfirmRef}
                placeholder="Password"
                type="password"
                name="password"
                required
                pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
              />
            </div>
            <div className="createAccount">
              <button disabled={loading} type="submit">Sign Up</button>
            </div>
          </form>
          <div className="signup-login">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
