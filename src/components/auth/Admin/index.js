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
    // console.log("FILE: ", file.name)
    // console.log('markdown file', typeof markdownFile, markdownFile)

    // usee parse-md to capture the metadata in the 'metadata' variable
    const { metadata, content } = parseMD(markdownFile)
    setMData(metadata)
    setPostContent(content)
    // setFile(content)
    // console.log('metadata: ', metadata)

    // remove metadata from .md file
    // split the post file into an array of lines
    const linesArray = markdownFile.split('\n')
    linesArray.splice(0, 10)
    // console.log(linesArray)
    let contentString = linesArray.join("\n")
    // console.log(contentString)
    setPost(contentString)
    // function to get the indices of the lines with "---"
    // const getIndices = (acc, line, i) => {
    //   if (/^---/.test(line)) {
    //     acc.push(i)
    //   }
    //   return acc
    // }
    // use the function in reduce() to get an array with the indices
    // const metadataIndices = linesArray.reduce(getIndices, [])
    // console.log(metadataIndices)
    // console.log('content', typeof content, content)

  }

  // const contentFileSelectedHandler = async (event) => {
  //   // console.log(event.target.files[0])
  //   setFile(event.target.files[0])
  // }

  const fileUploadHandler = async (event) => {
    let bucketName = 'markdown'
    let selectedFile = file
    // console.log('selectedFile ', selectedFile)
    let storageRef = app.storage().ref(`${bucketName}/${selectedFile.name}`)
    await storageRef.put(file)
    // get the URL for the file stored
    const mdFileUrl = await storageRef.getDownloadURL()
    console.log('File URL: ', mdFileUrl)
    setMData({ ...mData, url: mdFileUrl })
  }

  const metadataStoreHandler = () => {
    console.log('metadata: ', mData)
    const storageRef = app.firestore().collection("metadata")
    console.log('storageRef', storageRef)
    storageRef
      .doc()
      .set(mData)
      .catch((err) => {
        console.log(err)
      })
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

        <div className="admin-store">
          <h4>Upload File to Cloud Storage:</h4>
          <button onClick={fileUploadHandler}>Upload File</button>
        </div>
        <div className="admin-metadata">
          <h4>Store Metadata to FireStore</h4>
          <button onClick={metadataStoreHandler}>Store Metadata</button>
        </div>
        <div>
          <Markdown>{postContent}</Markdown>
        </div>
      </div>

    </>
  )
}

export default Admin
