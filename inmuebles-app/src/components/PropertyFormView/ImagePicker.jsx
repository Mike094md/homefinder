import React, { useState, useRef } from 'react';

function ImagePicker() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const fileInput = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  return (
    <div>
      {previewUrl ? (
        <img src={previewUrl} alt="Selected file" />
      ) : (
        <div>
          <button className="btn btn-primary" onClick={handleClick}>Select a file</button>
          <input type="file" ref={fileInput} onChange={handleFileChange} style={{ display: 'none' }} accept=".jpg" />
        </div>
      )}
    </div>
  );
}

export default ImagePicker;
