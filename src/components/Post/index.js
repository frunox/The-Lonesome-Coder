import React from 'react'
import { Redirect } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { usePosts } from '../../contexts/PostContext'
import { usePostSortStatus } from '../../contexts/PostContext'
import { usePostSortToggle } from '../../contexts/PostContext'

import HomeNav from '../HomeNav'
import '../postContent.css'

function Post(props) {
  const postArray = usePosts()
  const postSort = usePostSortStatus()
  const togglePostSort = usePostSortToggle()
  console.log('Post: postArray', postArray)
  // const postIndex = postArray.length
  let id = parseInt(props.match.params.id)

  if (postSort) {
    function findPostId(element) {
      return element.postId === id
    }
    id = postArray.findIndex(findPostId)
    togglePostSort()
  }

  console.log('id: ', id)
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
        <h1>{postArray[id].title}</h1>
        {/* <h3>Author: {postArray[id].author}</h3> */}
        <small>Published on {postArray[id].date}</small>
        <hr />
        <ReactMarkdown linkTarget={'_blank_'}>{postArray[id].content}</ReactMarkdown>
      </div>
    </React.Fragment>
  )
}

export default Post