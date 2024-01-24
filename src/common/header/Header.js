import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // CSS 모듈 임포트

const Header = () => {
    return (
        <header className={styles.Header}>
            <Link to="/" className={styles.Logo}>
                <img  src="/img/react.png" alt="Logo" />
            </Link>
            <nav className={styles.Navigation}>
                <Link to="/join" className={styles.NavLink}>링크 1</Link>
                <Link to="/link2" className={styles.NavLink}>링크 2</Link>
                <Link to="/link3" className={styles.NavLink}>링크 3</Link>
                <Link to="/link4" className={styles.NavLink}>링크 4</Link>
            </nav>
        </header>
    );
};

export default Header;
