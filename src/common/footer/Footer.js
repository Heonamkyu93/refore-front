import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer>
        <p>© 2023 My Website. All rights reserved.</p>
        <Link to="/join" >회원가입</Link>
        <Link to="/login" >로그인</Link>
        <Link to="/insert" >메뉴등록</Link>
        <Link to="/list" >리스트</Link>
    </footer>
    );
};

export default Footer;