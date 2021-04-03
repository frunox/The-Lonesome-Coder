import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext"
import './HomeNav.css'

const HomeNav = props => {

  const { currentUser } = useAuth()

  return (
    <header className='navbar-header'>
      <div className='navbar-logo-background'></div>
      <div><img className='navbar-logo' src="https://i.ibb.co/Hxn05GZ/soaring-bird.png" alt='logo'></img></div>
      {/* <div className="navbar-bird"></div> */}
      <div className='navbar-title'><a href='/'>TITLE</a></div>
      <input type='checkbox' id="navbar-toggle" className="navbar-toggle"></input>
      <nav className='navbar-nav'>
        <ul className='navbar-ul'>
          {currentUser && <li><Link to="/profile">Profile</Link></li>}
          {!currentUser &&
            <>
              <li><Link to='/login'>Log In</Link></li>
              <li><Link to='/signup'>Sign Up</Link></li>
            </>
          }
        </ul>
      </nav>
      <label for='navbar-toggle' className='navbar-toggle-label'>
        <span></span>
      </label>
    </header>
  )
}

export default HomeNav
