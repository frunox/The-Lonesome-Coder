import React, { useState } from "react";
import Modal from 'react-modal';
import { useAuth } from "../../contexts/AuthContext"
import { useModal } from "../../contexts/ModalContext"
// import { useHistory } from "react-router-dom";
import './Signup.css'


Modal.setAppElement(document.getElementById('root'))

// console.log('in LoginForm')

const Signup = () => {
  const [state, setState] = useState({
    githubID: "",
    password: "",
    loggedIn: false
  });

  const { signup } = useAuth()
  console.log('auth signup', signup)
  // const [modalIsOpen, setModalIsOpen] = useState(false)
  const { signupModalOpen, openSignupModal } = useModal()
  console.log('SIGNUP signupModalOpen', signupModalOpen)
  // const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log('handleChange', name, value)
    setState({ ...state, [name]: value });
    // console.log(name, value)
  };

  return (
    <div>
      <Modal isOpen={signupModalOpen} onRequestClose={() => openSignupModal(false)}
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
            height: '400px',
          }
        }}
      >
        <h1>Sign In</h1>
        <h4>* - Denotes Required Field</h4>
        <form onSubmit={handleSubmit}>
          {/* Git hub */}
          <div className="githubID">
            <label htmlFor="githubID">Github ID*</label>
            <input
              placeholder="Github ID"
              type="text"
              name="githubID"
              required
              onChange={handleChange}
            />
          </div>
          {/* Git hub */}
          <div className="password">
            <label htmlFor="password">Password*</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              required
              pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
              onChange={handleChange}
            />
          </div>
          <div className="createAccount">
            <button type="submit">Log In</button>
          </div>
        </form>
      </Modal>
    </div>

  );
}

export default Signup;
