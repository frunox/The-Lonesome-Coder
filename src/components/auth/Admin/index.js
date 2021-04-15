import React, { useState } from 'react'
import app from '../../../firebase'
import ReactMarkdown from 'react-markdown'
// import gfm from 'remark-gfm'
// import Markdown from 'markdown-to-jsx'
import '../../postContent.css'
const parseMD = require("parse-md").default


function Admin() {
  const [mData, setMData] = useState('')
  const [markdownFile, setMarkdownFile] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postUids, setPostUids] = useState([])
  const [message, setMessage] = useState("")

  const selectedFileHandler = async (event) => {
    setMessage("")
    // console.log(event.target.files[0])
    let rawFile = (event.target.files[0])
    let reader = new FileReader()
    reader.readAsText(rawFile)
    reader.onload = await function () {
      let file = reader.result
      // console.log('text: ', text)
      setMarkdownFile(file)
    };
    reader.onerror = await function () {
      console.log(reader.error);
    };
  }

  // const postUidArray = []

  const parseHandler = async () => {
    // use parse-md to capture the metadata in the 'metadata' variable and content in the 'content' variable
    const { metadata, content } = parseMD(markdownFile)
    setMData(metadata)
    setPostContent(content)
    console.log(metadata)
    // remove metadata from .md file
    // split the post file into an array of lines
    const linesArray = markdownFile.split('\n')
    linesArray.splice(0, 10)
    let contentString = linesArray.join("\n")
    setPostContent(contentString)
    postUids.push(metadata.postUid)
    setPostUids(postUids)
    console.log(postUids)
  }

  const postStoreHandler = () => {
    setMessage('')
    const postObject = mData
    postObject.content = postContent
    const storageRef = app.firestore().collection("metadata")
    // console.log('storageRef', storageRef)
    storageRef
      .doc(postObject.postUid)
      .set(postObject)
      .catch((err) => {
        console.log(err)
        setMessage('Firebase save post error. ' + err)
      })
    setMessage('New post saved/updated.')
  }

  // const fileUploadHandler = async (event) => {
  //   let bucketName = 'images'
  //   let selectedFile = file
  //   // console.log('selectedFile ', selectedFile)
  //   let storageRef = app.storage().ref(`${bucketName}/${selectedFile.name}`)
  //   await storageRef.put(file)
  //   // get the URL for the file stored
  //   const mdFileUrl = await storageRef.getDownloadURL()
  //   console.log('Image URL: ', mdFileUrl)
  //   setMData({ ...mData, imageUrl: mdFileUrl })
  // }

  return (
    <>
      <div className='admin-content'>
        <h2>Admin Page</h2>
        <div className="admin-parse">
          <h4>Choose Metadata File to Parse:</h4>
          <input type='file' onChange={selectedFileHandler} />
          <button onClick={parseHandler}>Parse Metadata and Preview File</button>
        </div>

        <div className="admin-metadata">
          <h4>Store Post to FireStore</h4>
          <button onClick={postStoreHandler}>Store/Update Post</button>
        </div>
        <h3 className='admin-message'>Message: {message}</h3>
        <h1>{mData.title}</h1>
        {/* <h3>Author: {postArray[id].author}</h3> */}
        <small>Published on {mData.date}</small>
        <hr />
        <div className='post-content'>
          <ReactMarkdown skipHtml={true} linkTarget={'_blank_'}>{postContent}</ReactMarkdown>
        </div>
      </div>
    </>
  )
}

export default Admin
