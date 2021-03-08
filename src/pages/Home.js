import React, { useState } from "react";
// import HomeNav from '../components/HomeNav'
import HomeNav from '../components/HomeNav'
import SideDrawer from '../components/SideDrawer/SideDrawer'
import Backdrop from '../components/Backdrop/Backdrop'
import Background from '../components/Background'
// import Signup from '../components/Signup'
// import drawerToggleButton from "../components/SideDrawer/ToggleButton";
// import SetupContext from '../contexts/SetupContext'

function Home() {
  const [state, setState] = useState({
    sideDrawerOpen: false
  })

  // const setupCtx = useContext(SetupContext) ?
  // function to toggle the open/close state of the side drawer (passed to toggle button)
  const drawerToggleClickHandler = () => {
    setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  // function to close the side drawer when clicking on the backdrop
  const backdropClickHandler = () => {
    setState({ sideDrawerOpen: false })
  }


  let backdrop;
  if (state.sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }

  return (
    <div style={{ height: '100%' }}>
      <HomeNav drawerClickHandler={drawerToggleClickHandler} />
      <SideDrawer show={state.sideDrawerOpen} />
      {backdrop}
      <Background />
      {/* <Signup /> */}
    </div>
  );
}

export default Home;
