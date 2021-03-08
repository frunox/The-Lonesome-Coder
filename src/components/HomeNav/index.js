import React from 'react'
import DrawerToggleButton from '../SideDrawer/ToggleButton'
import { useModal } from "../../contexts/ModalContext"
import './HomeNav.css'

const HomeNav = props => {
  const { signupModalOpen, openSignupModal } = useModal()
  console.log('signupModalOpen', signupModalOpen, openSignupModal)

  const toggleSignupModal = () => {
    console.log('in toggleSignupModal')
    openSignupModal(true)
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
            <li><a href='/login'>Log In</a></li>
            <li><a href="/signup" onClick={toggleSignupModal}>Sign Up</a></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default HomeNav
