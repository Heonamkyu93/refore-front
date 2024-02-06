import React , { useEffect, useState }from 'react';
import styles from './withdrawal.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../common/interceptor/interceptorAxios'; 
import ConfirmUser from './ConfirmUser';
import WithdrawalBtn from './WithdrawalBtn';
const serverIp = process.env.REACT_APP_SPRING_BOOT_IP;
const serverPort = process.env.REACT_APP_SPRING_BOOT_PORT;
const Withdrawal = () => {
  const navigate = useNavigate();
  const [isClear,setIsClear] = useState(false);
  const [formData, setFormData] = useState({
    memberEmail: "",
    memberPassword: "",
    memberId: "",
  });
  
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = sessionStorage.getItem('userInfo');
      const data = JSON.parse(user); 
      console.log(data);
      setFormData({
        memberEmail: data.memberEmail,
        memberId:data.memberId,
      });
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
      console.log(formData);
      axiosInstance.post('/in/passwordConfirm',formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        alert(response.data);
        setIsClear(true);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        alert(error.response.data);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (



        <div className={styles.findFormContainer}>
  <h2>회원탈퇴</h2>
      {!isClear && <ConfirmUser handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />}
      {isClear && <WithdrawalBtn formData={formData} />}
</div>
    );
};

export default Withdrawal;