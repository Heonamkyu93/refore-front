import styles from './withdrawal.module.css';
import React , {  useState }from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../common/interceptor/interceptorAxios'; 
const WithdrawalBtn = ({ formData }) => {
    const navigate = useNavigate();
    const handleSubmit =()=>{
        
        const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");
        console.log(`${formData.memberId}`);
        const memberId=formData.memberId;
        if(isConfirmed){
            axiosInstance.delete(`/in/withdrawal/${memberId}`)
              .then(response => {
                alert('회원탈퇴 완료');
                sessionStorage.removeItem('userInfo');
                sessionStorage.removeItem('jwt');
                sessionStorage.removeItem('refreshToken');
                navigate("/");
              })
              .catch(error => {
                console.error('Error fetching data: ', error);
                alert(error.response.data);
              });
        }

    }
    return (
        <div>
            <button type='button' className={styles.WithdrawalBtn} onClick={handleSubmit}>탈퇴</button>
                   </div>
    );
};

export default WithdrawalBtn;