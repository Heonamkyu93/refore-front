import React from 'react';
import Carousel from './Carousel';
import styles from './Main.module.css';
const Main = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.calContainer}>
                <Carousel />
            </div>
            {/* 다른 메인 페이지 콘텐츠 */}
        </div>
    );
};

export default Main;