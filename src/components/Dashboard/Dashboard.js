import React, { useState } from "react"
import { Confirm } from 'semantic-ui-react'
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  if (currentUser) {
    console.log('Dashboard currentUser', currentUser.email)
  } else {
    console.log('No current user')
    history.push("/")
  }
  // console.log('Dashboard logout', logout, typeof logout)
  const [state, setState] = useState({ open: false })

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  const closeConfirm = () => {
    setState({ open: false })
  }

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>

        <h1>Profile</h1>
        {/* {error &&
          <Confirm
            open={state.open}
            onConfirm={closeConfirm}
            content={error}
            size='tiny'
          />
        } */}
        <strong>Email:</strong> {currentUser.email}

        <div className="createAccount">
          <button type="submit" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  )
}
