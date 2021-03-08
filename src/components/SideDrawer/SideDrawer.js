import React from 'react'
import './SideDrawer.css'

const SideDrawer = props => {
  let drawerClasses = 'side-drawer'
  if (props.show) {
    drawerClasses = 'side-drawer open'
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li><a href='/login'>Log In</a></li>
        <li><a href='/signup'>Sign Up</a></li>
      </ul>
    </nav>
  )
}

export default SideDrawer;