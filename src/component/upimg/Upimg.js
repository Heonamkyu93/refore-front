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
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setFileName(file.name); // 파일 이름 설정
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
            } catch (error) {
                console.error('업로드 실패:', error);
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
