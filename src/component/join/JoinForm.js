import React, { useState,useEffect } from 'react';
import styles from './JoinForm.module.css';
const JoinForm = () => {
  const [formData,setFormData] = useState({
    memberEmail:"",
    memberPassword:"",
    memberName:"",
    memberNickname:"",
    phoneNumber:"",
    confirmPassword:"",
  });
  
    const changeValue =(e) =>{
      const {name , value} = e.target;
      setFormData({...formData,[name]:value});
    };


    return (
        <div className={styles.joinContainer}>
           <div className={styles.joinFormContainer}>
              <form>
              <div className={styles.joinInputDiv}>
              <span>이메일</span><input type='email' maxLength={50} required onChange={changeValue} name='memberEmail'></input>
              <button type='button'>중복확인</button>
              </div>
              <div className={styles.joinInputDiv}>
                <span>닉네임</span>
                <input type='text' maxLength={15} required onChange={changeValue} name='memberNickname'></input>
                <button type='button'>중복확인</button>
              </div>
              <div className={styles.joinInputDiv}>
                <span>이름</span>
                <input type='text' maxLength={10} required onChange={changeValue} name='memberName'></input>
              </div>
              <div className={styles.joinInputDiv}>
                <span>비밀번호</span>
                <input type='password' maxLength={10} required onChange={changeValue} name='memberPassword'></input>
              </div>
              <div className={styles.joinInputDiv}>
                <span>비밀번호 확인</span>
                <input type='password' maxLength={10} required onChange={changeValue} name='confirmPassword'></input>
              </div>
              <div className={styles.joinInputDiv}>
                <span>전화번호</span>
                <input type='text' maxLength={11} required onChange={changeValue} name='phoneNumber'></input>
              </div>
              <div className={styles.joinInputDiv}>
              <input type="submit" value="회원가입"></input>
              </div>
              </form>
           </div>
        </div>
    );
};

export default JoinForm;           