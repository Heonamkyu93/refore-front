import React, { useState } from 'react';
import styles from './MenuInsert.module.css';
import axios from 'axios';
import axiosInstance from '../../common/interceptor/interceptorAxios'; 

const MenuInsert = () => {
    const [foodName, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [foodInfo, setFoodInfo] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('buggerName', foodName);
        formData.append('buggerPrice', price);
        formData.append('buggerInfo', foodInfo);
        formData.append('imageFile', image);

        try {
            const response = await axiosInstance.post('/in/menuInsert', formData,{ headers: {
                'Content-Type': 'multipart/form-data'
            }});
            alert(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
            const errors = error.response.data;
            let errorMessage = "정보수정 불가:\n";
            Object.entries(errors).forEach(([field, message]) => {
                errorMessage += `${message}\n`;
            });
            alert(errorMessage);
        }
    };

    return (
        <div className={styles.insertContainer}>
            <div className={styles.formContainer}>
                <div className={styles.logoDiv}> 
                    <img src="/img/mcdlogo.png" alt="logo" className={styles.logoImg} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="foodName">품명:</label>
                        <input
                            type="text"
                            id="foodName"
                            value={foodName}
                            className={styles.menuinput} 
                            onChange={(e) => setFoodName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="price">가격:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            className={styles.menuinput} 
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="foodInfo">정보:</label>
                        <textarea
                            id="foodInfo"
                            value={foodInfo}
                            className={styles.menuinput} 
                            onChange={(e) => setFoodInfo(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="image">사진 업로드:</label>
                        <br/>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.fileButton}
                            required
                        />
                    </div>
                    <div className={styles.formSubmit}>
                        <input type="submit" value="제품 등록"  className={styles.submitBtn}></input>
                    </div>
                </form>
                {previewImage && (
                    <img src={previewImage} alt="미리보기" className={styles.previewImage} />
                )}
            </div>
        </div>
    );
};

export default MenuInsert;
