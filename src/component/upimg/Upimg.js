import React, { useState } from 'react';
import axios from 'axios';
import styles from './Upimg.module.css'; // CSS 모듈 import

const serverIp = process.env.REACT_APP_FASTAPI_IP;
const serverPort = process.env.REACT_APP_FASTAPI_PORT;

const Upimg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [fileName, setFileName] = useState(''); // 파일 이름 상태 추가

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement("img");
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
    
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
    
                    canvas.toBlob((blob) => {
                        const newFile = new File([blob], "converted.jpg", { type: "image/jpeg", lastModified: Date.now() });
                        setSelectedFile(newFile);
                        setPreview(URL.createObjectURL(newFile));
                        setFileName(newFile.name); // 파일 이름 설정
                    }, 'image/jpeg', 1); // 마지막 인자는 JPG 품질 설정 (0 ~ 1)
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert('이미지 파일이 아닙니다.');
        }
    };
    

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await axios.post(`http://${serverIp}:${serverPort}/in/img`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('서버 응답:', response.data);
            } catch (error) {
                console.log(error.response.data)
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.uploadControl}>
                <input type="file" id="fileInput" className={styles.fileInput} onChange={handleFileChange} />
                <label htmlFor="fileInput" className={styles.fileInputLabel}>{fileName || '파일 선택'}</label>
                <button onClick={handleUpload} className={styles.uploadButton}>업로드</button>
            </div>
            {preview && <img src={preview} alt="Preview" className={styles.imagePreview} />}
        </div>
    );
}

export default Upimg;
