import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post(`http://localhost:3001/api/v1/addImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      console.log(response.data);
      // Handle successful upload, show a success message, etc.
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input  type="file" onChange={handleFileChange} />
      <img src="http://localhost:3001/1685744917249-165900802.png" alt="ni mili" />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && progress < 100 && (
        <progress value={progress} max="100" />
      )}
    </div>
  );
};

export default App;
