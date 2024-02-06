import styles from './withdrawal.module.css';
import React , {  useState }from 'react';
import axiosInstance from '../../common/interceptor/interceptorAxios'; 
const WithdrawalBtn = ({ formData }) => {
    const handleSubmit =()=>{
        const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");

        if(isConfirmed){
            axiosInstance.delete(`/in/withdrawal/${formData.memberId}`)
              .then(response => {
                console.log('seccess');
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