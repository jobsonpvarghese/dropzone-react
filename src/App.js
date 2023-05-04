import React, { useState } from "react"

const FileUpload = () => {
  const [files, setFiles] = useState([])
  const [custodian, setCustodian] = useState("")
  const [uploading, setUploading] = useState(false)

  const handleDrop = e => {
    e.preventDefault()
    const newFiles = [...files]
    for (const file of e.dataTransfer.files) {
      newFiles.push(file)
    }
    setFiles(newFiles)
  }

  const handleFileInputChange = e => {
    const newFiles = [...files]
    for (const file of e.target.files) {
      newFiles.push(file)
    }
    setFiles(newFiles)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setUploading(true)
    const numFiles = files.length
    let uploadedCount = 0
    const interval = setInterval(() => {
      uploadedCount++
      if (uploadedCount >= numFiles) {
        clearInterval(interval)
        setUploading(false)
        setFiles([])
        setCustodian("")
      }
    }, 1000)
  }

  const renderUploadForm = () => {
    if (uploading) {
      return (
        <div>
          <p>Uploading files...</p>
          <progress max={files.length} value={0} />
        </div>
      )
    }
    if (files.length > 0) {
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="custodian-input">Custodian:</label>
            <input type="text" id="custodian-input" value={custodian} onChange={e => setCustodian(e.target.value)} />
          </div>
          <button type="submit">Submit</button>
        </form>
      )
    }
    return (
      <div onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
        <p>Drag and drop files here or click to select files.</p>
        <input type="file" multiple onChange={handleFileInputChange} />
      </div>
    )
  }

  return <div>{renderUploadForm()}</div>
}

export default FileUpload
