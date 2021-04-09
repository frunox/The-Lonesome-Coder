import React, { useState } from 'react'
import app from '../../../firebase'
import './Admin.css'
const parseMD = require("parse-md").default


function Admin() {
  const [file, setFile] = useState(null)
  const [mData, setMData] = useState('')
  const [markdown, setMarkdown] = useState('')

  const metadataFileSelectedHandler = async (event) => {
    // console.log(event.target.files[0])
    setFile(event.target.files[0])
    let rawFile = (event.target.files[0])
    let reader = new FileReader()

    reader.readAsText(rawFile)
    reader.onload = await function () {
      let text = reader.result
      // console.log('text: ', text)
      setMarkdown(text)
    };
    reader.onerror = await function () {
      console.log(reader.error);
    };
  }

  const parseHandler = async () => {
    // console.log('markdown', markdown)

    const { metadata, content } = parseMD(markdown)
    setMData(metadata)
    // console.log('metadata: ', metadata)

    // remove metadata from .md file


  }

  const contentFileSelectedHandler = async (event) => {
    // console.log(event.target.files[0])
    setFile(event.target.files[0])
  }

  const fileUploadHandler = async (event) => {
    let bucketName = 'markdown'
    let selectedFile = file
    console.log('selectedFile ', selectedFile)
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
          <button onClick={parseHandler}>Parse Metadata</button>
        </div>

        <div className="admin-store">
          <h4>Choose Content File Upload to Storage:</h4>
          <input type='file' onChange={contentFileSelectedHandler} />
          <button onClick={fileUploadHandler}>Upload File</button>
        </div>
        <div className="admin-metadata">
          <p>Store Metadata to FireStore</p>
          <button onClick={metadataStoreHandler}>Store Metadata</button>
        </div>
      </div>

    </>
  )
}

export default Admin
