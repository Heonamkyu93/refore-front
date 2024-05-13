// MenuInsert.js
import React, { useState } from 'react';
import styles from './MenuInsert.module.css';
import axios from 'axios';
const serverIp = process.env.REACT_APP_SPRING_BOOT_IP;
const serverPort = process.env.REACT_APP_SPRING_BOOT_PORT;
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

    return (
        <div className={styles.insertContainer}>
            
            <div className={styles.formContainer}>
            <div className={styles.logoDiv}> 
                <img src="/img/mcdlogo.png" alt="logo" className={styles.logoImg} />
            </div>
            <form>
                <div className={styles.formGroup}>
                    <label htmlFor="foodName">품명:</label>
                    <input
                        type="text"
                        id="foodName"
                        value={foodName}
                        className={styles.menuinput} 
                        onChange={(e) => setFoodName(e.target.value)}
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
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="foodInfo">정보:</label>
                    <textarea
                        id="foodInfo"
                        value={foodInfo}
                        className={styles.menuinput} 
                        onChange={(e) => setFoodInfo(e.target.value)}
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
