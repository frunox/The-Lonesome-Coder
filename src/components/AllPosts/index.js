import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { usePosts } from "../../contexts/PostContext"
import { usePostSortToggle } from '../../contexts/PostContext'
import '../components.css'

function AllPosts() {
  const [state, setState] = useState()
  const [renderArray, setRenderArray] = useState([])
  let postArray = usePosts()
  const togglePostSort = usePostSortToggle()

  useEffect(() => {
    setRenderArray(postArray)
  }, [postArray])
  console.log("AllPosts: postArray", postArray)
  let searchArray = []

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const searchHandler = (e) => {
    e.preventDefault()
    searchArray = []
    togglePostSort()
    console.log('in searchHandler', state)
    let searchString = state.searchbox
    console.log(searchString)
    for (let i = 0; i < postArray.length; i++) {
      // console.log('in loop')
      if (postArray[i].keywords.toLowerCase().includes(searchString.toLowerCase())) {
        searchArray.push(postArray[i])
        console.log(postArray[i].keywords.toLowerCase(), searchString.toLowerCase())
      }
    }
    console.log("AllPosts searchArray: ", searchArray)
    setRenderArray(searchArray)
  }

  return (
    <div className='content'>
      <form className="allposts-search" onSubmit={(e) => searchHandler(e)}>
        <label htmlFor='searchbox'>Search Posts by Keyword: </label>
        <input className="allposts-searchbox" type='text' placeholder='keyword' name='searchbox' onChange={handleChange}></input>
      </form>
      {
        renderArray.length > 0 ?
          renderArray.map((post, i) => {
            return (
              <div className="post-card" key={post.postId}>
                <Link className='post-link' to={`/post/${post.postId}`}>
                  <h2 className='post-title'>{post.title}</h2>
                  <small>Published on {post.date}</small>
                  <hr></hr>
                  <ReactMarkdown className='post-card-summary'>{post.summary}</ReactMarkdown>
                  <small className="click">Click to read more...</small>
                </Link>
              </div>
            )
          })
          :
          <h3 className='allposts-message'>No results found</h3>
      }
    </div>
  )
}

export default AllPosts
