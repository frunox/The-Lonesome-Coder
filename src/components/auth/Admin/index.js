import React, { useState } from 'react';
import app from '../../../firebase';
import ReactMarkdown from 'react-markdown';
// import gfm from 'remark-gfm'
// import Markdown from 'markdown-to-jsx'
import '../../postContent.css';
const parseMD = require('parse-md').default;

const db = app.firestore();

function Admin() {
  const [mData, setMData] = useState('');
  const [markdownFile, setMarkdownFile] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postUids, setPostUids] = useState([]);
  const [imageFile, setImageFile] = useState('');
  const [message, setMessage] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const selectedFileHandler = (event) => {
    setMessage('');
    console.log('selectedFileHandler: ', event.target.files[0].name);
    let rawFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(rawFile);
    reader.onload = function () {
      let file = reader.result;
      // console.log('text: ', text)
      setMarkdownFile(file);
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const selectedImageHandler = (event) => {
    setMessage('');
    setImgUrl('');
    console.log('selectedImageHandler: ', event.target.files[0].name);
    let rawFile = event.target.files[0];
    console.log('raw image file', rawFile);
    setImageFile(rawFile);
  };

  // const postUidArray = []

  const parseHandler = () => {
    // use parse-md to capture the metadata in the 'metadata' variable and content in the 'content' variable
    const { metadata, content } = parseMD(markdownFile);
    setMData(metadata);
    setPostContent(content);
    console.log('parseHandler: ', metadata);
    // remove metadata from .md file
    // split the post file into an array of lines
    const linesArray = markdownFile.split('\n');
    linesArray.splice(0, 11);
    let contentString = linesArray.join('\n');
    setPostContent(contentString);
    postUids.push(metadata.postUid);
    setPostUids(postUids);
    // console.log(postUids);
  };

  const imageStorageHandler = async (event) => {
    setMessage('');
    let bucketName = 'images';
    let selectedImage = imageFile;
    console.log('imageStorageHandler image file', selectedImage);
    // console.log('selectedFile ', selectedFile)
    let storageRef = app.storage().ref(`${bucketName}/${selectedImage.name}`);
    await storageRef.put(selectedImage).catch((err) => {
      console.log(err);
      setMessage('Firebase save post error. ' + err);
    });
    // get the URL for the file stored
    const imageFileUrl = await storageRef.getDownloadURL();
    console.log('Image URL: ', imageFileUrl);
    console.log('mData', mData);
    setMData({ ...mData, imageUrl: imageFileUrl });
    // const metaData = mData;
    // console.log('metaData', metaData, typeof metaData);
    // metaData.imageUrl = imageFileUrl;
    // console.log('metaData w/ Url', metaData);
    // setMData(metaData);
    // setMessage('Image file stored');
  };

  const postStoreHandler = () => {
    setMessage('');
    console.log('postStoreHandler mData', mData);
    const postObject = mData;
    postObject.content = postContent;
    const storageRef = db.collection('metadata');
    // console.log('storageRef', storageRef)
    storageRef
      .doc(postObject.postUid)
      .set(postObject)
      .catch((err) => {
        console.log(err);
        setMessage('Firebase save post error. ' + err);
      });
    setMessage('New post saved/updated.');
  };

  const previewImageHandler = async () => {
    setMessage('');
    setPostContent('');
    console.log('previewImageHandler: postUid', mData.postUid, mData.imageUrl);
    const snapshot = await db.collection('metadata').doc(mData.postUid).get();
    const data = snapshot.data();
    console.log('previewImageHandler data', data.imageUrl);
    setImgUrl(data.imageUrl);
  };

  return (
    <>
      <div className="admin-content">
        <h2>Admin Page</h2>
        <div className="admin-parse">
          <h4>Choose Markdown File to Parse:</h4>
          <input type="file" onChange={selectedFileHandler} />
          <button onClick={parseHandler}>
            Parse Metadata and Preview File
          </button>
        </div>

        <div className="admin-parse">
          <h4>Choose Image File to Add:</h4>
          <input type="file" onChange={selectedImageHandler} />
          <button onClick={imageStorageHandler}>Save Image File</button>
        </div>

        <div className="admin-metadata">
          <h4>Store Post to Firestore</h4>
          <button onClick={postStoreHandler}>Store/Update Post</button>
        </div>

        <div className="admin-metadata">
          <h4>Preview Image</h4>
          <button onClick={previewImageHandler}>Retrieve Image</button>
        </div>

        <h3 className="admin-message">Message: {message}</h3>
        <h1>{mData.title}</h1>
        {/* <h3>Author: {postArray[id].author}</h3> */}
        <small>Published on {mData.date}</small>
        <hr />
        <img src={imgUrl} alt="" />
        <div className="post-content">
          <ReactMarkdown skipHtml={true} linkTarget={'_blank_'}>
            {postContent}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default Admin;
