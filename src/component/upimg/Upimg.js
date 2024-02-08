import React, { useState } from 'react';
import axios from 'axios';
const serverIp = process.env.REACT_APP_FASTAPI_IP;
const serverPort = process.env.REACT_APP_FASTAPI_PORT;
const Upimg = () => {
   
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      // 파일이 이미지 형식인지 검사합니다.
      if (file && file.type.startsWith('image/')) {
        setSelectedFile(file);
      } else {
        alert('이미지 파일이 아닙니다.');
      }
    };
  
    const handleUpload = async () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        try {
          const response = await axios.post(`http://${serverIp}:${serverPort}/in/upimg`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('서버 응답:', response.data);
          // 업로드 성공 후 처리
        } catch (error) {
          console.error('업로드 실패:', error);
          // 업로드 실패 처리
        }
      }
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>업로드</button>
      </div>
    );
  }
  
export default Upimg;<h1>이미지</h1>