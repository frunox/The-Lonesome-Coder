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
  const [imageFile, setImageFile] = useState('');
  const [message, setMessage] = useState('');
  const [imageName, setImageName] = useState([]);
  const [urlsArray, setUrlsArray] = useState([]);
  const [imageIndices, setImageIndices] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [numberOfImages, setNumberOfImages] = useState(0);

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
    // console.log('selectedImageHandler: ', event.target.files[0].name);
    let rawFile = event.target.files[0];
    // console.log('raw image file', rawFile);
    setImageFile(rawFile);
  };

  const parseHandler = () => {
    // use parse-md to capture the metadata in the 'metadata' variable and content in the 'content' variable
    const { metadata, content } = parseMD(markdownFile);
    setMData(metadata);
    setPostContent(content);
    // console.log('parseHandler: ', metadata);
    // remove metadata from .md file
    // split the post file into an array of lines
    const linesArray = markdownFile.split('\n');
    linesArray.splice(0, 12);
    let imageIndex = [];
    for (let i = 0; i < linesArray.length; i++) {
      // console.log(linesArray[i]);
      if (linesArray[i][0] === '!') {
        imageIndex.push(i);
      }
    }
    console.log('imageIndex array', imageIndex);
    if (imageIndex.length > 0) {
      setImageCount(1);
      setNumberOfImages(imageIndex.length);
    }
    setImageIndices(imageIndex);
    let contentString = linesArray.join('\n');
    // console.log('post string', contentString);
    setPostContent(contentString);
  };

  const imageStorageHandler = async (event) => {
    setMessage('');
    let bucketName = 'images';
    let selectedImage = imageFile;
    // console.log('imageStorageHandler image file', selectedImage);
    // console.log('selectedFile ', selectedFile)
    let urls = urlsArray;
    let names = imageName;
    console.log('urls:', urlsArray, 'names:', imageName);
    names.push(selectedImage.name);
    console.log('imageStorageHandler names', names, typeof names);
    setImageName(names);
    let storageRef = app.storage().ref(`${bucketName}/${selectedImage.name}`);
    await storageRef.put(selectedImage).catch((err) => {
      console.log(err);
      setMessage('Firebase save post error. ' + err);
    });
    // get the URL for the file stored
    const imageFileUrl = await storageRef.getDownloadURL();
    urls.push(imageFileUrl);
    console.log('urls after push:', urls);
    setUrlsArray(urls);
    console.log('Image URL: ', imageFileUrl);
    // console.log('mData', mData);
    setMData({ ...mData, imageUrl: urls, imageName: names });
    if (imageCount < numberOfImages) {
      setImageCount((prevImageCount) => prevImageCount + 1);
    }
    setMessage('Image File ' + imageCount + ' saved');
  };

  const addLinksHandler = () => {
    console.log('updatePostHandler mData', mData);
    let linesArray = postContent.split('\n');
    for (let i = 0; i < imageIndices.length; i++) {
      let newLine = linesArray[imageIndices[i]].replace(
        ')',
        urlsArray[i] + ')'
      );
      linesArray[imageIndices[i]] = newLine;
    }
    let contentString = linesArray.join('\n');
    // console.log('post string', contentString);
    setPostContent(contentString);
  };

  const postStoreHandler = () => {
    setMessage('');
    // console.log('postStoreHandler mData', mData);
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
    setMData('');
    setMarkdownFile('');
    setUrlsArray([]);
    setImageIndices([]);
    setImageCount(0);
    setNumberOfImages(0);
  };

  const previewImageHandler = async () => {
    setMessage('');
    setPostContent('');
    // console.log('previewImageHandler: postUid', mData.postUid, mData.imageUrl);
    const snapshot = await db.collection('metadata').doc(mData.postUid).get();
    const data = snapshot.data();
    // console.log('previewImageHandler data', data.imageUrl);
    setUrlsArray(data.imageUrl);
  };

  return (
    <>
      <div className="admin-content">
        <h2>Admin Page</h2>
        <div className="admin-parse">
          <h3>Select Markdown File to Parse:</h3>
          <input type="file" onChange={selectedFileHandler} />
          <button onClick={parseHandler}>
            Parse Metadata and Preview File
          </button>
        </div>

        <div className="admin-parse">
          <h3>
            Select Image File {imageCount} of {numberOfImages} to Add:
          </h3>
          <input type="file" onChange={selectedImageHandler} />
          <button onClick={imageStorageHandler}>Save Image File</button>
        </div>

        <div className="admin-metadata">
          <h3>Add Image Link(s) Post</h3>
          <button onClick={addLinksHandler}>Add Link(s) and Preview</button>
        </div>

        <div className="admin-metadata">
          <h3>Store Post to Firestore</h3>
          <button onClick={postStoreHandler}>Store/Update Post</button>
        </div>

        <div className="admin-metadata">
          <h3>Preview Image</h3>
          <button onClick={previewImageHandler}>Retrieve Image</button>
        </div>

        <h3 className="admin-message">Message: {message}</h3>
        <h1>{mData.title}</h1>
        {/* <h3>Author: {postArray[id].author}</h3> */}
        <small>Published on {mData.date}</small>
        <hr />
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
