import React from 'react'
import { Link } from 'react-router-dom'
import DrawerToggleButton from '../SideDrawer/ToggleButton'
import { useAuth } from "../../contexts/AuthContext"
import './HomeNav.css'

const HomeNav = props => {

  const { currentUser } = useAuth()

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
                <li><Link to='/login'>Log In</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
              </>
            }
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default HomeNav
