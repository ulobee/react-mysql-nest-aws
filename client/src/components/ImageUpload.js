import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const URI = process.env.REACT_APP_API_URI;

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setIsLoading(true);
      const response = await axios.post(`${URI}/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('File uploaded successfully!');
      setSelectedFile(null);
      fetchImages(); // Refresh the image list
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file!');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${URI}/images`);
      setImageList(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>

      <h3>Uploaded Images</h3>
      <div>
        {imageList.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Uploaded ${index}`}
            style={{ maxWidth: '200px', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;