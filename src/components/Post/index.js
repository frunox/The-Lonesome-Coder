import React from 'react'
import { Redirect } from 'react-router-dom'
// import app from '../../firebase'
import { usePosts } from '../../contexts/PostContext'
import HomeNav from '../HomeNav'
import './Post.css'

function Post(props) {
  // const postArray = usePosts()
  // console.log('Post: postArray', postArray)
  // const postIndex = postArray.length
  const id = parseInt(props.match.params.id)
  console.log('type', typeof id, id)
  // const maxValidId = postArray[0].postId
  // const maxValidId = postIndex
  // console.log('maxValidId', maxValidId)
  if (Object.is(NaN, id)) {
    return <Redirect to='/404' />
  }
  // let postRef = app.storage().ref.child('markdown')

  return (
    <React.Fragment>
      <HomeNav />
      <div className='post-content'>
        <h2>Post page</h2>
      </div> :
    </React.Fragment>
  )
}

export default Post