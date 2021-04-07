import React from 'react'
import PostList from '../PostList'
import './homePage.css'

export default function HomePage() {
  return (
    <div className='home-content'>
      <h1 className='home-headline'>Welcome.  The coding journey begins...</h1>
      <h3 className='home-message'>Recent Posts ></h3>
      <PostList />
    </div>
  )
}
