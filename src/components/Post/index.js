import React from 'react';
import { Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { usePosts } from '../../contexts/PostContext';

import HomeNav from '../HomeNav';
import '../postContent.css';

function Post(props) {
  const postArray = usePosts();
  console.log('Post: postArray', postArray);
  // const postIndex = postArray.length
  let id = parseInt(props.match.params.id);

  function findPostId(element) {
    return element.postId === id;
  }
  id = postArray.findIndex(findPostId);

  console.log('POST id after sort: ', id);
  const maxValidId = postArray[0].postId;
  console.log('maxValidId', maxValidId);

  if (Object.is(NaN, id)) {
    return <Redirect to="/404" />;
  }
  // let postRef = app.storage().ref.child('markdown')

  return (
    <React.Fragment>
      <HomeNav />
      <div className="post-content">
        <h1>{postArray[id].title}</h1>
        {/* <h3>Author: {postArray[id].author}</h3> */}
        <small>Published on {postArray[id].date}</small>
        <hr />
        <ReactMarkdown skipHtml={true} linkTarget={'_blank_'}>
          {postArray[id].content}
        </ReactMarkdown>
        <p>
          Send comments or suggestions for future posts to <span> </span>
          <a href="mailto:john@acodersquest.com">john@acodersquest.com</a>
        </p>
      </div>
    </React.Fragment>
  );
}

export default Post;
