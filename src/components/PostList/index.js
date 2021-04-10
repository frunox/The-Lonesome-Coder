import React, { useState, useEffect } from 'react'
// import Markdown from 'markdown-to-jsx'
import ReactMarkdown from 'react-markdown'
import { firestore } from '../../firebase'
// import { usePosts } from "../../contexts/PostContext"
import { usePostsUpdate } from "../../contexts/PostContext"
import './PostList.css'

function PostList() {
  const [posts, setPosts] = useState([])
  const savePosts = usePostsUpdate()

  useEffect(() => {
    const postsRef = firestore.collection('metadata')
    postsRef.get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          ...doc.data()
        }))
        posts.sort((a, b) => b.postId - a.postId)
        console.log('PostList: in useEffect, posts.length', posts.length)
        savePosts(posts)

        setPosts(posts)
      })
  }, [])

  console.log('PostList: Posts length after useEffect', posts.length)
  let array = [...posts]
  if (array.length > 3) {
    array.splice(3)
  }
  console.log('PostList: array spliced: ', array, 'posts length', posts.length)

  return (
    <div className='postlist'>
      {
        array.length &&
        array.map((post, i) => {
          return (
            <div className="post-card" key={post.postId}>
              <h2>{post.title}</h2>
              <small>Published on {post.date}</small>
              <hr></hr>
              <ReactMarkdown className='post-card-summary'>{post.summary}</ReactMarkdown>
              <small className="click">Click to read more...</small>
            </div>
          )
        })
      }
    </div >
  )
}

export default PostList
