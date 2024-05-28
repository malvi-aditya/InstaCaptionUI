import React from 'react'

export default function Addimage(props) {
  const { onChange } = props
    return (
        <form id="upload-file" method="post" encType="multipart/form-data">
            <label htmlFor="imageUpload" className="upload-label">
                Click to Upload Image File
            </label>
            <input type="file" name="file" id="imageUpload" accept=".png, .jpg, .jpeg" onChange={onChange}/>
        </form>
    )
}
