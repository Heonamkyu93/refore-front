import { Link,NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useState,React } from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('refreshToken');
    }


    return (
        <header className={styles.Header}>
            <NavLink to="/" className={styles.Logo}>
                <img  src="/img/react.png" alt="Logo" />
            </NavLink>
            <nav className={styles.Navigation}>
                {userInfo ? (<>
                   
                     <NavLink to="/mypage" className={styles.NavLink}>마이페이지</NavLink>
                     <NavLink  onClick={handleLogout} className={styles.NavLink}>로그아웃</NavLink>
                </>):(<>
                
                    <NavLink to="/join" className={styles.NavLink}>회원가입</NavLink>
                    <NavLink to="/login" className={styles.NavLink}>로그인</NavLink>
                
                </>)}
              
            
               
            </nav>
        </header>
    );
};

export default Header;