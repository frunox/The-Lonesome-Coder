import React, { useContext, useState } from "react"

const ModalContext = React.createContext()

export function useModal() {
  return useContext(ModalContext)
}

export function ModalProvider({ children }) {
  const [signupModalOpen, setSignupModalOpen] = useState(false)

  function openSignupModal(setting) {
    console.log('ModalContext openSignupModal', setting)
    return setSignupModalOpen(setting)
  }

  const value = {
    signupModalOpen,
    openSignupModal,
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}
