import React, { useState, useContext } from "react"

const ModalContext = React.createContext()


export function useModal() {
  return useContext(ModalContext)
}

export function ModalProvider({ children }) {
  const [state, setState] = useState({
    signupModalOpen: false,
    loginModalOpen: false
  })

  let signupOpen = state.signupModalOpen
  let loginOpen = state.loginModalOpen

  function openSignupModal(setting) {
    console.log('ModalContext openSignupModal', setting)
    return setState({
      ...state,
      signupModalOpen: setting
    })
  }

  function openLoginModal(setting) {
    console.log('ModalContext openLoginModal', setting, state)
    return setState({
      ...state,
      loginModalOpen: setting
    })
  }

  function swapLoginSigninModals() {
    // console.log('ModalContext openLoginModal', setting, state)
    return setState({
      ...state,
      signupModalOpen: true,
      loginModalOpen: false
    })
  }

  function swapSigninLoginModals() {
    // console.log('ModalContext openLoginModal', setting, state)
    return setState({
      ...state,
      signupModalOpen: false,
      loginModalOpen: true
    })
  }

  const value = {
    signupOpen,
    loginOpen,
    openSignupModal,
    openLoginModal,
    swapLoginSigninModals,
    swapSigninLoginModals
  }
  console.log('ModalContext loginOpen', loginOpen)
  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

// export const ModalProvider = (props) => {
//   const [state, setState] = useState({
//     signupModalOpen: false
//   })

//   return (
//     <ModalContext.Provider value={
//       {
//         state: state,

//         openSignupModal: (value) => {
//           // console.log('setupCtx updateDevUpdated', value)
//           setState({
//             ...state,
//             devUpdated: value
//           })
//         }
//       }
//     }>
//       {props.children}
//     </ModalContext.Provider>
//   )
// }


