import React from "react"

const Dropzone = props => {
  const { files, setFiles } = props

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

  const onClickInput = () => {
    document.querySelector("input[type=file]").click()
  }

  return (
    <div className="container">
      <h2>Upload your files here.</h2>
      <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} className="drop_zone_box">
        <p className="drop_zone_text">Drop files here or click to select files.</p>
        <input className="" hidden type="file" multiple onChange={handleFileInputChange} />
        <button className="drop_zone_button" onClick={() => onClickInput()}>
          Choose file
        </button>
      </div>
    </div>
  )
}

export default Dropzone
