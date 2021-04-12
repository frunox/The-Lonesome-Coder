import React, { useState } from 'react'
import app from '../../../firebase'
// import ReactMarkdown from 'react-markdown'
// import gfm from 'remark-gfm'
import Markdown from 'markdown-to-jsx'
import './Admin.css'
const parseMD = require("parse-md").default


function Admin() {
  const [file, setFile] = useState(null)
  const [mData, setMData] = useState('')
  const [markdownFile, setMarkdownFile] = useState('')
  const [post, setPost] = useState('')
  const [postContent, setPostContent] = useState('')

  const metadataFileSelectedHandler = async (event) => {
    // console.log(event.target.files[0])
    setFile(event.target.files[0])
    let rawFile = (event.target.files[0])
    let reader = new FileReader()

    reader.readAsText(rawFile)
    reader.onload = await function () {
      let text = reader.result
      // console.log('text: ', text)
      setMarkdownFile(text)
    };
    reader.onerror = await function () {
      console.log(reader.error);
    };
  }

  const parseHandler = async () => {
    // use parse-md to capture the metadata in the 'metadata' variable and content in the 'content' variable
    const { metadata, content } = parseMD(markdownFile)
    setMData(metadata)
    setPostContent(content)

    // remove metadata from .md file
    // split the post file into an array of lines
    const linesArray = markdownFile.split('\n')
    linesArray.splice(0, 10)
    let contentString = linesArray.join("\n")
    console.log(contentString)
    setPost(contentString)
  }

  // const fileUploadHandler = async (event) => {
  //   let bucketName = 'markdown'
  //   let selectedFile = file
  //   // console.log('selectedFile ', selectedFile)
  //   let storageRef = app.storage().ref(`${bucketName}/${selectedFile.name}`)
  //   await storageRef.put(file)
  //   // get the URL for the file stored
  //   const mdFileUrl = await storageRef.getDownloadURL()
  //   console.log('File URL: ', mdFileUrl)
  //   setMData({ ...mData, url: mdFileUrl })
  // }

  const metadataStoreHandler = () => {
    const postObject = mData
    postObject.content = postContent
    // console.log('postObject: ', postObject)
    const storageRef = app.firestore().collection("metadata")
    // console.log('storageRef', storageRef)
    storageRef
      .doc()
      .set(postObject)
      .catch((err) => {
        console.log(err)
      })
    let string = postObject.content
    console.log(string)
    setPost(string)
  }

  return (
    <>
      <div className='admin-content'>
        <h2>Admin Page</h2>
        <div className="admin-parse">
          <h4>Choose Metadata File to Parse:</h4>
          <input type='file' onChange={metadataFileSelectedHandler} />
          <button onClick={parseHandler}>Parse Metadata and Preview File</button>
        </div>

        {/* <div className="admin-store">
          <h4>Upload File to Cloud Storage:</h4>
          <button onClick={fileUploadHandler}>Upload File</button>
        </div> */}
        <div className="admin-metadata">
          <h4>Store Post to FireStore</h4>
          <button onClick={metadataStoreHandler}>Store Post</button>
        </div>
        <div>
          <Markdown>{post}</Markdown>
        </div>
      </div>
    </>
  )
}

export default Admin
