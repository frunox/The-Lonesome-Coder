import React, { useState, useEffect } from 'react'
// import Markdown from 'markdown-to-jsx'
import ReactMarkdown from 'react-markdown'
// import content from '../../post2.md'
import { firestore } from '../../firebase'
import './PostList.css'

function PostList() {
  const [posts, setPosts] = useState([])
  // const [markdown, setMarkdown] = useState("")
  // console.log('Post List: ', postlist)


  useEffect(() => {
    // let blogContent = []
    const postsRef = firestore.collection('metadata')
    // fetch(content)
    //   .then((res) => res.text())
    //   .then((text) => setMarkdown(text))
    postsRef.get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          ...doc.data()
        }))
        posts.sort((a, b) => b.postId - a.postId)
        if (posts.length > 3) {
          posts.splice(3)
        }
        console.log('posts: ', posts)
        setPosts(posts)
        // setMarkdown(blogContent)
      })
    // console.log(markdown)
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
              <ReactMarkdown className='post-card-summary'>{post.summary}</ReactMarkdown>
            </div>
          )
        })
      }
    </div >
  )
}

export default PostList
