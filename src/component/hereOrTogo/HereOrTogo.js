import React from 'react';
import styles from './HereOrTogo.module.css';
import { Link } from 'react-router-dom';
const HereOrTogo = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoDiv}> 
                <img src="/img/mcdlogo.png" alt="logo" className={styles.logoImg} />
            </div>
            <div className={styles.ImgDiv}>
                <div className={styles.hereImgDiv}>
                <Link to="/join" >
                    <button className={styles.imgBtn}>
                    <img src="/img/here.png" alt="here" className={styles.hereImg}/>
                    <span className={styles.buttonText}> 매장에서 식사</span>
                    </button>
                    </Link>
                </div>
                <div className={styles.togoImgDiv}>
                <Link to="/" className={styles.Logo}>
                <button className={styles.imgBtn}>
                    <img src="/img/togo.png" alt="togo" className={styles.togoImg}/>
                    <span className={styles.buttonText}>포장 하기</span>
                  </button>
                  </Link>
                </div>
            </div>
        </div>
    );
};

export default HereOrTogo;
