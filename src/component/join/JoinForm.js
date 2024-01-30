import React, { useState,useEffect } from 'react';
import styles from './JoinForm.module.css';
import axios from 'axios';
const serverIp = process.env.REACT_APP_SPRING_BOOT_IP;
const serverPort = process.env.REACT_APP_SPRING_BOOT_PORT;


const JoinForm = () => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);


  const [formData,setFormData] = useState({
    memberEmail:"",
    memberPassword:"",
    memberName:"",
    nickname:"",
    phoneNumber:"",
    confirmPassword:"",
  });
  
    const changeValue =(e) =>{
      const inputId=e.target.id;
      if(inputId==='memberEmail'){
      setIsEmailChecked(false);
      }else if(inputId==='phoneNumber'){
        setIsPhoneChecked(false);
      }else if(inputId==='nickname'){
        setIsNicknameChecked(false);
      }
      const {name , value} = e.target;
      setFormData({...formData,[name]:value});
    };



    const sendData = (e) => {
      e.preventDefault();
      let inputName=document.getElementById('memberName').value;
      let inputPwd=document.getElementById('memberPassword').value;
      let inputConfirmPwd=document.getElementById('confirmPassword').value;


      if(inputName.length<2 || inputName > 10){
        alert('이름은 2자리 이상 10자리 이하여야 합니다.');
        return;
      }else if(inputPwd.length <10 || inputPwd >30){
        alert('비밀번호는 10자리 이상 30자리 이하여야 합니다.');
        return;
      }else if(!inputPwd===inputConfirmPwd){
        alert('비밀번호와 비밀번호 확인은 값이 같아야 합니다.');
        return;
      }




      if (!isEmailChecked) {
        alert('이메일 중복 확인을 해주세요.');
        return;
      }else if(!isPhoneChecked){
        alert('전화번호 중복 확인을 해주세요.');
        return;
      }else if (!isNicknameChecked){
        alert('닉네임 중복 확인을 해주세요.');
        return;
      }


      axios.post(`http://${serverIp}:${serverPort}/join`,formData)
      .then(response => {
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
      });
    
    };
    function duplicatedCheck(event){
      let type = event.target.getAttribute('data-type'); 
      let inputElement;
      let url; 
      if (type === 'email') {
       let confirmEmail=document.getElementById('memberEmail');
       if (confirmEmail.validity.valid) {
        inputElement = document.getElementById('memberEmail').value;
        url = `http://${serverIp}:${serverPort}/emailDuplicatedCheck?value=${inputElement}`;
       }else{
        alert('유효하지 않은 이메일 형식입니다.');
        return;
       }
      } else if (type === 'nickname') {
        inputElement = document.getElementById('nickname').value;
        if (inputElement.length < 2 || inputElement.length > 20) {  // 2미만 20초과
          alert('닉네임은 2자리 이상 20자리 이하여야 합니다.');
          return;
        }
        url = `http://${serverIp}:${serverPort}/nicknameDuplicatedCheck?value=${inputElement}`;
      }else if(type === 'phoneNumber'){
       
        inputElement = document.getElementById('phoneNumber').value;
        if (inputElement.length < 10 || inputElement.length > 11) {  // 10미만 11초과
          console.log(inputElement);
          alert('전화번호는 10자리 이상 11자리 이하여야 합니다.');
          return;
        }
        url = `http://${serverIp}:${serverPort}/phoneNumberDuplicatedCheck?value=${inputElement}`;
      }
      axios.get(url)
      .then(response => {
        if(response.data.type==='email'){
          setIsEmailChecked(true);
        }else if(response.data.type==='phoneNumber'){
          setIsPhoneChecked(true);
        }else if(response.data.type==='nickname'){
          setIsNicknameChecked(true);
        }
      })
      .catch(error => {
        alert(error.response.data);
      })
      .finally(() => {
      });
    
    }
    
    return (
        <div className={styles.joinContainer}>
           <div className={styles.joinFormContainer}>
              <form onSubmit={sendData}>
              <div className={styles.joinInputDiv}>
              <span>이메일</span><input type='email' maxLength={50} required onChange={changeValue} name='memberEmail' id='memberEmail'></input>
              <button type='button' onClick={duplicatedCheck} data-type='email'>중복확인</button>
              </div>
              <div className={styles.joinInputDiv}>
                <span>전화번호</span>
                <input type='text' maxLength={11} required onChange={changeValue} name='phoneNumber' id='phoneNumber'></input>
                <button type='button' onClick={duplicatedCheck} data-type='phoneNumber'>중복확인</button>
              </div>
              <div className={styles.joinInputDiv}>
                <span>닉네임</span>
                <input type='text' maxLength={15} required onChange={changeValue} name='nickname' id='nickname'></input>
                <button type='button' onClick={duplicatedCheck} data-type='nickname'>중복확인</button>
              </div>
              <div className={styles.joinInputDiv}>
                <span>이름</span>
                <input type='text' maxLength={10} required onChange={changeValue} name='memberName' id='memberName' ></input>
              </div>
              <div className={styles.joinInputDiv}>
                <span>비밀번호</span>
                <input type='password' maxLength={10} required onChange={changeValue} name='memberPassword' id='memberPassword'></input>
              </div>
              <div className={styles.joinInputDiv}>
                <span>비밀번호 확인</span>
                <input type='password' maxLength={10} required onChange={changeValue} name='confirmPassword' id='confirmPassword'></input>
              </div>
             
              <div className={styles.joinInputDiv}>
              <input type="submit" value="회원가입" ></input>
              </div>
              </form>
           </div>
        </div>
    );
};

export default JoinForm;           