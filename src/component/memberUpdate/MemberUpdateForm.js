import React, { useState , useEffect} from 'react';
import styles from './MemberUpdateForm.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../common/interceptor/interceptorAxios'; 
const serverIp = process.env.REACT_APP_SPRING_BOOT_IP;
const serverPort = process.env.REACT_APP_SPRING_BOOT_PORT;
const MemberUpdateForm = () => {
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    memberEmail:"",
    memberName:"",
    nickname:"",
    phoneNumber:"",
  });
    useEffect(() => {
        axiosInstance.get('/in/info')
      .then(response=>{
        const data = response.data;
        console.log(`데이터=${data}`);
            setFormData({
              memberEmail:data.memberEmail,
              memberName:data.memberName,
              nickname:data.nickname,
              phoneNumber:data.phoneNumber,

            });
            console.log(formData);
      }).catch(error=>{

      }).finally(()=>{

      });
    
    },[]);


    
    
      const changeValue =(e) =>{
        const inputId=e.target.id;
       if(inputId==='phoneNumber'){
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
  
  
        if(inputName.length<2 || inputName > 10){
          alert('이름은 2자리 이상 10자리 이하여야 합니다.');
          return;
        }
  
  
  
  
       if(!isPhoneChecked){
          alert('전화번호 중복 확인을 해주세요.');
          return;
        }else if (!isNicknameChecked){
          alert('닉네임 중복 확인을 해주세요.');
          return;
        }
  
  
        axios.post(`http://${serverIp}:${serverPort}/out/join`,formData)
        .then(response => {
            alert(response.data);
            navigate("/login");
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
          url = `http://${serverIp}:${serverPort}/out/emailDuplicatedCheck?value=${inputElement}`;
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
          url = `http://${serverIp}:${serverPort}/out/nicknameDuplicatedCheck?value=${inputElement}`;
        }else if(type === 'phoneNumber'){
         
          inputElement = document.getElementById('phoneNumber').value;
          if (inputElement.length < 10 || inputElement.length > 11) {  // 10미만 11초과
            console.log(inputElement);
            alert('전화번호는 10자리 이상 11자리 이하여야 합니다.');
            return;
          }
          url = `http://${serverIp}:${serverPort}/out/phoneNumberDuplicatedCheck?value=${inputElement}`;
        }
        axios.get(url)
        .then(response => {
           if(response.data.type==='phoneNumber'){
            setIsPhoneChecked(true);
            alert('사용가능 합니다.');
          }else if(response.data.type==='nickname'){
            setIsNicknameChecked(true);
            alert('사용가능 합니다.');
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
                <span>이메일</span><input type='email' maxLength={50} required onChange={changeValue} name='memberEmail' id='memberEmail' readOnly value={formData.memberEmail}></input>
                </div>
                <div className={styles.joinInputDiv}>
                  <span>전화번호</span>
                  <input type='text' maxLength={11} required onChange={changeValue} name='phoneNumber' id='phoneNumber' value={formData.phoneNumber}></input>
                  <button type='button' onClick={duplicatedCheck} data-type='phoneNumber'>중복확인</button>
                </div>
                <div className={styles.joinInputDiv}>
                  <span>닉네임</span>
                  <input type='text' maxLength={15} required onChange={changeValue} name='nickname' id='nickname' value={formData.nickname}></input>
                  <button type='button' onClick={duplicatedCheck} data-type='nickname'>중복확인</button>
                </div>
                <div className={styles.joinInputDiv}>
                  <span>이름</span>
                  <input type='text' maxLength={10} required onChange={changeValue} name='memberName' id='memberName'value={formData.memberName} ></input>
                </div>
               
                <div className={styles.joinInputDiv}>
                <input type="submit" value="정보수정" ></input>
                </div>
                </form>
             </div>
          </div>
    );
};
export default MemberUpdateForm;