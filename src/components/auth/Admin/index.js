import React, { useState } from 'react'
import app from '../../../firebase'
import './Admin.css'

function Admin() {
  const [file, setFile] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)

  const fileSelectedHandler = event => {
    // console.log(event.target.files[0])
    setFile(event.target.files[0])
  }

  const parseHandler = () => {
    console.log('Parse file', file.name)
  }

  const fileUploadHandler = async () => {
    console.log('File selected: ', file)
    let bucketName = 'markdown'
    let selectedFile = file
    console.log('selectedFile ', selectedFile)
    let storageRef = app.storage().ref(`${bucketName}/${selectedFile.name}`)
    await storageRef.put(file)
    // get the URL for the file stored
    const mdFileUrl = await storageRef.getDownloadURL()
    console.log('File URL: ', mdFileUrl)
    setFileUrl(mdFileUrl)
  }

  return (
    <>
      <div className='admin-content'>
        <h2>Admin Page</h2>
        <div className="admin-parse">
          <h4>Choose file to parse:</h4>
          <input type='file' onChange={fileSelectedHandler} />
          <button onClick={parseHandler}>Parse Metadata</button>
        </div>

        <div className="admin-store">
          <p>Store file</p>
          <button onClick={fileUploadHandler}>Upload</button>
        </div>
      </div>

    </>
  )
}

export default Admin
