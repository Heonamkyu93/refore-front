import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('refreshToken');
        navigate("/");
    }

    return (
        <header className={styles.Header}>
            <Link to="/" className={styles.Logo}>
                <img src="/img/logo.png" alt="Logo" />
            </Link>
            <nav className={styles.Navigation}>
                {userInfo ? (
                    <>
                        <Link to="/mypage" className={styles.NavLink}>마이페이지</Link>
                        <button onClick={handleLogout} className={styles.NavLink}>로그아웃</button>
                        
                    </>
                ) : (
                    <>
                        <Link to="/join" className={styles.NavLink}>회원가입</Link>
                        <Link to="/login" className={styles.NavLink}>로그인</Link>
                        <Link to="/upimg" className={styles.NavLink}>이미지</Link>
                        <Link to="/sound" className={styles.NavLink}>사운드</Link>
                        <Link to="/ocr" className={styles.NavLink}>OCR</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
