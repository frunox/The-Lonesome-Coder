import React from 'react'
import { Redirect } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
// import app from '../../firebase'
import { usePosts } from '../../contexts/PostContext'
import HomeNav from '../HomeNav'
import './Post.css'

function Post(props) {
  const postArray = usePosts()
  console.log('Post: postArray', postArray)
  // const postIndex = postArray.length
  const id = parseInt(props.match.params.id)
  console.log('id: ', id, 'type', typeof id)
  const maxValidId = postArray[0].postId
  console.log('maxValidId', maxValidId)

  if (Object.is(NaN, id)) {
    return <Redirect to='/404' />
  }
  // let postRef = app.storage().ref.child('markdown')

  return (
    <React.Fragment>
      <HomeNav />
      <div className='post-content'>
        <h2>{postArray[id].title}</h2>
        <h2>Author: {postArray[id].author}</h2>
        <small>Published on {postArray[id].date}</small>
        <hr></hr>
        <ReactMarkdown>{postArray[id].content}</ReactMarkdown>
      </div>
    </React.Fragment>
  )
}

export default Post