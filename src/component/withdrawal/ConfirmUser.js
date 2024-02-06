import React from 'react';
import styles from './withdrawal.module.css';

const ConfirmUser = ({ handleChange, handleSubmit, formData }) => {
    return (
      <>
          <div></div>
          <label htmlFor="memberPassword" className={styles.labelEmail}>본인확인</label>
          <div className={styles.inputWithButton}>
          <input
    type="password"
    id="memberPassword"
    name="memberPassword"
    className={styles.findInput}
    placeholder='비밀번호를 입력하세요'
    onChange={handleChange}
  />
  <button className={styles.findBtn} onClick={handleSubmit}>탈퇴</button>
          </div>
          <div></div>
      
      </>      
    );
};

export default ConfirmUser;
