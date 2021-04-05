import React from "react";
// import HomeNav from '../components/HomeNav'
import HomeNav from '../components/HomeNav'
import HomePage from '../components/HomePage'
// import Background from '../components/Background'
// import Dashboard from '../components/Dashboard'
// import Signup from '../components/Signup'
// import Login from '../components/Login'

function Home() {

  // const setupCtx = useContext(SetupContext) ?
  // function to toggle the open/close state of the side drawer (passed to toggle button)

  return (
    <div style={{ height: '100%' }}>
      <HomeNav />
      {/* <Background /> */}
      <HomePage />
      {/* <Dashboard /> */}
      {/* <Signup />
      <Login />
      <Dashboard /> */}
    </div>
  );
}

export default Home;
