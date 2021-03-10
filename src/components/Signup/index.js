import React, { useRef, useState } from "react";
import Modal from 'react-modal';
import { Confirm } from 'semantic-ui-react'
import { useAuth } from "../../contexts/AuthContext"
import { useModal } from "../../contexts/ModalContext"
import { useHistory, Link } from "react-router-dom";
import './Signup.css'


Modal.setAppElement(document.getElementById('root'))

// console.log('in LoginForm')

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

  const { signupOpen, openSignupModal, swapSigninLoginModals } = useModal()

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
      openSignupModal(false)
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

  const swapModals = () => {
    swapSigninLoginModals()
  }

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <Modal isOpen={signupOpen} onRequestClose={() => openSignupModal(false)}
          // shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 255, 0.5)',
              zIndex: '100'
            },
            content: {
              borderRadius: '10px',
              top: '90px',
              border: '1px solid black',
              width: '400px',
              margin: '0 auto',
              height: '390px',
            }
          }}
        >
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
            Already have an account? <Link onClick={swapModals}>Log In</Link>
          </div>
        </Modal>
      </div>
    </div>

  );
}

export default Signup;
