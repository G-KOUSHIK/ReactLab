// import './App.css';
// import axios from 'axios';
// import React, { useState } from 'react';

// import { useEffect } from 'react';



// function App() {

//   const [videoUrls, setVideoUrls] = useState([]);

//   // Function to fetch video URLs from the backend
//   const fetchVideoUrls = async () => {
//     try {
//       const response = await axios.get('https://localhost:7240/api/OnlineLab/BlobList');
//       const urls = response.data.map(video => video.url); // Assuming your backend returns an array of objects with 'url' property
//       setVideoUrls(urls);
//     } catch (error) {
//       console.error('Error fetching video URLs:', error.response.data);
//     }
//   };

//   // Fetch video URLs when component mounts
//   useEffect(() => {
//     fetchVideoUrls();
//   }, []);



//   const handleUpload = async (event) => {
//     event.preventDefault(); // Prevent form submission

//     const formData = new FormData();
//     const files = document.getElementById('files').files;
//     for (let i = 0; i < files.length; i++) {
//       formData.append('files', files[i]);
//     }

//     try {
//       const response = await axios.post('https://localhost:7240/api/OnlineLab/BlobPost', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log(response.data);
//       // Handle success
//       alert('Files uploaded successfully!');
//     } catch (error) {
//       console.error('Error uploading files:', error.response.data);
//       // Handle error

//     }
//   };







//   return (
//     <div className="file-uploader">
//       <header>
//         <h1>File uploader</h1>
//       </header>
//       <p className="message"></p>
//       <form action='#' method='post'>
//         <label htmlFor="files"> select file(s) </label>
//         <br/>  
//         <br/> 
//         <input type="file" id="files" multiple required name="uploadFile"/>
//         <br/>  
//         <br/> 
//         <input type="submit" value="upload" onClick={handleUpload} className="btn"/>
//       </form>

//       {/* Display uploaded videos */}
//       <div className="videos">
//         {videoUrls.map((url, index) => (
//           <video key={index} controls>
//             <source src={url} type="video/mp4" />
//             <source src={url} type="video/webm" />
//             <source src={url} type="video/ogg" />
//             Your browser does not support the video tag.
//           </video>
//         ))}
//       </div>

//     </div>
    
//   );

  
// }

// export default App;
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [videoUrls, setVideoUrls] = useState([]);

  // Function to fetch video URLs from the backend
  const fetchVideoUrls = async () => {
    try {
      const response = await axios.get('https://localhost:7240/api/OnlineLab/BlobList');
      setVideoUrls(response.data);
    } catch (error) {
      console.error('Error fetching video URLs:', error.response.data);
    }
  };

  // Fetch video URLs when component mounts
  useEffect(() => {
    fetchVideoUrls();
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData();
    const files = document.getElementById('files').files;
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      await axios.post('https://localhost:7240/api/OnlineLab/BlobPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // After uploading, fetch the updated list of videos
      fetchVideoUrls();
      alert('Files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error.response.data);
    }
  };

  return (
    <div className="file-uploader">
      <header>
        <h1>File uploader</h1>
      </header>
      <form action='#' method='post'>
        <label htmlFor="files"> Select file(s) </label>
        <br/>
        <input type="file" id="files" multiple required name="uploadFile"/>
        <br/>
        <input type="submit" value="Upload" onClick={handleUpload} className="btn"/>
      </form>

      {/* Display uploaded videos */}
      <div className="videos">
        {videoUrls.map((url, index) => (
          <div key={index}>
            <video controls>
              <source src={url} type="video/mp4" />
              <source src={url} type="video/webm" />
              <source src={url} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
