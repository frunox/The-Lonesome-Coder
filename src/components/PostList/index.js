import React from 'react'
import './PostList.css'

import postlist from "../../posts.json"

function PostList() {
  console.log('Post List: ', postlist)
  return (
    <div className='postlist'>
      {postlist.length &&
        postlist.map((post, i) => {
          return (
            <div className="post-card">
              <h2>{post.title}</h2>
              <small>Published on {post.date}</small>
              <hr></hr>
              <p className='post-card-summary'>{post.summary}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default PostList
