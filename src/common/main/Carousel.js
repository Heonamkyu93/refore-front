import React from 'react';
import Slider from 'react-slick';
import styles from './Carousel.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className={styles.carouselContainer}>
        <Slider {...settings}>
            <div className={styles.carouselSlide}>
                <img className={styles.carouselImage} src="/img/test.jpg" alt="이미지 1" />
            </div>
            <div className={styles.carouselSlide}>
                <img className={styles.carouselImage} src="/img/test2.jpg" alt="이미지 2" />
            </div>
            <div className={styles.carouselSlide}>
                <img className={styles.carouselImage} src="/img/test3.jpg" alt="이미지 3" />
            </div>
        </Slider>
    </div>
    );
};

export default Carousel;
