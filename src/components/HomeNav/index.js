import React from 'react'
import { Link } from 'react-router-dom'
import DrawerToggleButton from '../SideDrawer/ToggleButton'
import { useAuth } from "../../contexts/AuthContext"
import { useModal } from "../../contexts/ModalContext"
import './HomeNav.css'

const HomeNav = props => {
  const { openSignupModal, openLoginModal } = useModal()
  // console.log('signupModalOpen', signupOpen)

  const { currentUser } = useAuth()

  const toggleSignupModal = () => {
    console.log('in toggleSignupModal')
    openSignupModal(true)
  }

  const toggleLoginModal = () => {
    console.log('in toggleLoginModal')
    openLoginModal(true)
  }

  return (
    <header className='toolbar'>
      <nav className='toolbar_navigation'>
        <div className='toolbar__toggle-button'>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className='toolbar_logo'><a href='/'>LOGO</a></div>
        <div className='spacer' />
        <div className='toolbar_nav-items'>
          <ul>
            {currentUser && <li><Link to="/profile">Profile</Link></li>}
            {!currentUser &&
              <>
                <li><button onClick={toggleLoginModal}>Log In</button></li>
                <li><button onClick={toggleSignupModal}>Sign Up</button></li>
              </>
            }
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default HomeNav
