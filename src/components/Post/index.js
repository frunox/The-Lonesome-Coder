import React from 'react';
import ReactMarkdown from 'react-markdown';

import { usePosts } from '../../contexts/PostContext';

import HomeNav from '../HomeNav';
import '../postContent.css';

function Post(props) {
  const postArray = usePosts();
  let slug = props.match.params.id;

  function findPostId(element) {
    return element.slug === slug;
  }
  let id = postArray.findIndex(findPostId);

  return (
    <React.Fragment>
      <HomeNav />
      <div className="post-content">
        <h1>{postArray[id].title}</h1>
        {/* <h3>Author: {postArray[id].author}</h3> */}
        <small>Published on {postArray[id].date}</small>
        {/* <hr /> */}
        <ReactMarkdown skipHtml={true} linkTarget={'_blank_'}>
          {postArray[id].content}
        </ReactMarkdown>
        <p>
          Thank you for reading my blog. Please send comments or suggestions for
          future posts to <span> </span>
          <a href="mailto:john@acodersquest.com">john@acodersquest.com.</a>
        </p>
      </div>
    </React.Fragment>
  );
}

export default Post;
