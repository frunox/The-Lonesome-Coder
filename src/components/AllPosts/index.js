import React from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { usePosts } from "../../contexts/PostContext"
import './AllPosts.css'

function AllPosts() {
  const postArray = usePosts()
  console.log("AllPosts: postArray", postArray)
  return (
    <div className='all-posts-content'>
      <h3 className='home-message'>All Posts...</h3>
      {
        postArray.length &&
        postArray.map((post, i) => {
          return (
            <Link to={`/post/${i}`}>
              <div className="post-card" key={post.postId}>
                <h2>{post.title}</h2>
                <small>Published on {post.date}</small>
                <hr></hr>
                <ReactMarkdown className='post-card-summary'>{post.summary}</ReactMarkdown>
                <small className="click">Click to read more...</small>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default AllPosts
