import React, { useState } from "react"
import Dropzone from "./Dropzone"

const Form = () => {
  const [files, setFiles] = useState([])
  const [custodian, setCustodian] = useState("")
  const [uploading, setUploading] = useState(false)

  const handleSubmit = e => {
    if (custodian) {
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
    } else {
      alert("Please enter a custodian name")
    }
  }

  if (uploading) {
    return (
      <div className="loading_container">
        <p className="loading_text">Uploading files...</p>
        <progress value={null} />
      </div>
    )
  }
  if (files.length > 0) {
    return (
      <div className="input_container">
        <form onSubmit={handleSubmit} className="input_form">
          <div className="input_label">
            <label htmlFor="custodian-input">Custodian:</label>
            <input type="text" placeholder="Enter custodian" id="custodian-input" value={custodian} onChange={e => setCustodian(e.target.value)} />
          </div>
          <button type="submit" className="submitBtn">
            Submit
          </button>
        </form>
      </div>
    )
  }

  return <Dropzone files={files} setFiles={setFiles} />
}

export default Form
