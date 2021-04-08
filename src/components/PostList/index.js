import React, { useState, useEffect } from 'react'
// import Markdown from 'markdown-to-jsx'
import ReactMarkdown from 'react-markdown'
// import content from '../../post2.md'
import { firestore } from '../../firebase'
import './PostList.css'

import postlist from "../../posts.json"

function PostList() {
  const [posts, setPosts] = useState([])
  // const [markdown, setMarkdown] = useState("")
  // console.log('Post List: ', postlist)


  useEffect(() => {
    // let blogContent = []
    const postsRef = firestore.collection('posts')
    // fetch(content)
    //   .then((res) => res.text())
    //   .then((text) => setMarkdown(text))
    postsRef.get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          ...doc.data()
        }))
        posts.sort((a, b) => b.postId - a.postId)
        // console.log('posts: ', posts) 
        setPosts(posts)
        // setMarkdown(blogContent)
      })
    // console.log(markdown)
  }, [])

  // let welcomePost = posts[posts.length - 1]
  // console.log(welcomePost)
  const input =
    "# This is a header\n\nAnd this is a paragraph \n\n # This is header again"

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
              {console.log(post.content)}
              <ReactMarkdown className='post-card-summary'>{post.summary}</ReactMarkdown>
              <ReactMarkdown source={input} />
              <div>
                <ReactMarkdown source={post.content} escapeHtml={false} />
              </div>
            </div>
          )
        })
      }
    </div >
  )
}

export default PostList
