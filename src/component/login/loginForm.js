import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import {  Link,useNavigate } from "react-router-dom";
import axios from 'axios';
const serverIp = process.env.REACT_APP_SPRING_BOOT_IP;
const serverPort = process.env.REACT_APP_SPRING_BOOT_PORT;
const LoginForm = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
      memberEmail: '',
      memberPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append('memberEmail', loginData.memberEmail);
        formData.append('memberPassword', loginData.memberPassword);

        axios.post(`http://${serverIp}:${serverPort}/login`, loginData, {
          headers: {
              'Content-Type': 'application/json',
          }
      }).then(response => {
      })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                  // JWT가 만료된 경우, 리프레시 토큰으로 새 JWT 요청
                  axios.get(`http://${serverIp}:${serverPort}/refresh-token`)
                    .then(response => {
                      
                    })
                    .catch(refreshError => {
                      // 리프레시 토큰도 만료되었거나 문제가 있는 경우 처리
                    });
                }
              })
            .finally(() => {
            });
    };


    return (
        <form onSubmit={handleSubmit}>
        <div className={styles.loginFormContainer}>
        <h2>로그인</h2>
          <div className={styles.formGroup}>
            <label htmlFor="memberEmail" className={styles.loginLabel}>이메일</label>
            <input type="text" id="memberEmail" name='memberEmail' className={styles.loginInput}  onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="memberPassword" className={styles.loginLabel}>비밀번호</label>
            <input type="password" id="memberPassword" name='memberPassword' className={styles.loginInput}  onChange={handleChange} />
          </div>
          <button type="submit" className={styles.loginBtn}>로그인</button>
        <div className={styles.links}>
        <Link to="/findForm">ID/PW찾기</Link>
          <Link to="/joinForm">회원가입</Link>
        </div>
      </div>
        </form>
    );
};

export default LoginForm;