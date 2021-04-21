import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { usePosts } from '../../contexts/PostContext';
import '../components.css';

function AllPosts() {
  const [state, setState] = useState();
  const [renderArray, setRenderArray] = useState([]);
  let postArray = usePosts();

  let searchArray = [];

  useEffect(() => {
    setRenderArray(postArray);
  }, [postArray]);
  console.log('AllPosts: postArray', postArray);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log('handleChange', name, value);
    setState({ ...state, [name]: value });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    searchArray = [];
    console.log('in searchHandler', state);
    let searchString = state.searchbox;
    console.log(searchString);
    for (let i = 0; i < postArray.length; i++) {
      // console.log('in loop')
      if (
        postArray[i].keywords.toLowerCase().includes(searchString.toLowerCase())
      ) {
        searchArray.push(postArray[i]);
        console.log(
          postArray[i].keywords.toLowerCase(),
          searchString.toLowerCase()
        );
      }
    }
    console.log('AllPosts searchArray: ', searchArray);
    setRenderArray(searchArray);
  };

  const keywordSearchHandler = (e) => {
    console.log('keywordSearchHandler', e.target.name, e.target.value);
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="content">
      <form className="allposts-search" onSubmit={(e) => searchHandler(e)}>
        <label htmlFor="searchbox">Search Posts by Keyword: </label>
        <input
          className="allposts-searchbox"
          type="text"
          placeholder="keyword"
          name="searchbox"
          onClick={handleChange}
        ></input>
      </form>
      <form className="allposts-keyword-row" onSubmit={(e) => searchHandler(e)}>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="react"
          onClick={keywordSearchHandler}
        >
          react
        </button>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="css"
          onClick={keywordSearchHandler}
        >
          CSS
        </button>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="firebase"
          onClick={keywordSearchHandler}
        >
          Firebase
        </button>
        <button
          className="allposts-keyword"
          type="text"
          value="firestore"
          onClick={keywordSearchHandler}
        >
          Firestore
        </button>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="javascript"
          onClick={keywordSearchHandler}
        >
          JavaScript
        </button>
      </form>
      {renderArray.length > 0 ? (
        renderArray.map((post, i) => {
          return (
            <div className="post-card" key={post.postId}>
              <Link className="post-link" to={`/post/${post.postId}`}>
                <h2 className="post-title">{post.title}</h2>
                <small>Published on {post.date}</small>
                <hr></hr>
                <ReactMarkdown className="post-card-summary">
                  {post.summary}
                </ReactMarkdown>
                <small className="click">Click to read more...</small>
              </Link>
            </div>
          );
        })
      ) : (
        <h3 className="allposts-message">No results found</h3>
      )}
    </div>
  );
}

export default AllPosts;
