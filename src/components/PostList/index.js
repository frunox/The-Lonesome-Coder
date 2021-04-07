import React, { useState, useEffect } from 'react'
import { firestore } from '../../firebase'
import './PostList.css'

// import postlist from "../../posts.json"

function PostList() {
  const [posts, setPosts] = useState([])
  // console.log('Post List: ', postlist)


  useEffect(() => {
    const postsRef = firestore.collection('posts')
    postsRef.get()
      .then((snapshot) => {
        // snapshot.docs.forEach((doc) => console.log(doc.id, doc.data()))
        const posts = snapshot.docs.map((doc) => ({
          ...doc.data()
        }))
        posts.sort((a, b) => b.postId - a.postId)
        // console.log('posts: ', posts)
        setPosts(posts)
      })
  }, [])

  // let welcomePost = posts[posts.length - 1]
  // console.log(welcomePost)

  return (
    <div className='postlist'>
      {
        posts.length &&
        posts.map((post, i) => {
          return (
            <div className="post-card" key={post.postId}>
              <h2>{post.title}</h2>
              <small>Published on {post.date}</small>
              <hr></hr>
              <p className='post-card-summary'>{post.summary}</p>
            </div>
          )
        })
      }
    </div >
  )
}

export default PostList
