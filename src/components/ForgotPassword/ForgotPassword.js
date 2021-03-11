import React, { useRef, useState } from "react";
import { Confirm } from 'semantic-ui-react'
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom";
// import './Login.css'

export default function ForgotPassword() {
  const emailRef = useRef()

  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({ open: false })

  async function handleSubmit(e) {
    e.preventDefault()

    // the loading state is set to disable the button so only 1 account is created
    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for instructions to reset your password')
    } catch {
      setError("Invalid email")
      setState({ open: true })
    }

    setLoading(false)
  }

  const closeConfirm = () => {
    setState({ open: false })
  }


  return (
    <div>
      <div className='login-background'>
        <div className='wrapper'>
          <div className='form-wrapper'>
            <div className='login-form-outline'>
              <h1>Reset Password</h1>
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
                <div className="createAccount">
                  <button disabled={loading} type="submit">Reset Password</button>
                </div>
                <div className="signup-login">
                  <Link to="/login">Log In</Link>
                </div>
              </form>
            </div>
            <div className="signup-login">
              Need an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
