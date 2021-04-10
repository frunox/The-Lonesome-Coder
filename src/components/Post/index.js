import React from 'react'
import { usePosts } from '../../contexts/PostContext'
import HomeNav from '../HomeNav'
import './Post.css'

function Post(props) {
  const postArray = usePosts()
  console.log(props)
  console.log('Post postArray', postArray[0].postId)
  return (
    <React.Fragment>
      <HomeNav />
      <div className='post-content'>
        <h2>Post page</h2>
      </div>
    </React.Fragment>
  )
}

export default Post