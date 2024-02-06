import React from 'react';
import {  Route, Routes,NavLink } from "react-router-dom";
import { ProtectedRoute } from '../../common/route/ProtectedRoute';
import MemberUpdateForm from '../memberUpdate/MemberUpdateForm';
import styles from './MyPage.module.css';
import Withdrawal from '../withdrawal/Withdrawal';
import ChangePwd from '../changePwd/ChangePwd';
const MyPage = () => {
    return (
    <>
       <div className={styles.linkContainer}>
    <NavLink
          to="/mypage/memberUpdate"
          className={({ isActive }) =>
          isActive ? `${styles.protectedlink} ${styles.activeLink}` : styles.protectedlink}
        >
          정보수정
        </NavLink>
        <NavLink
          to="/mypage/withdrawal"
          className={({ isActive }) =>
          isActive ? `${styles.protectedlink} ${styles.activeLink}` : styles.protectedlink}
        >
          회원탈퇴
        </NavLink>
        <NavLink
          to="/mypage/passwordChange"
          className={({ isActive }) =>
          isActive ? `${styles.protectedlink} ${styles.activeLink}` : styles.protectedlink}
        >
          비밀번호변경
        </NavLink>
        </div>
    <Routes>
    <Route index element={<ProtectedRoute> <MemberUpdateForm/>
    </ProtectedRoute>}/>

    <Route path='memberUpdate' element={<MemberUpdateForm/>} />
    <Route path='withdrawal' element={<Withdrawal/>} />
    <Route path='passwordChange' element={<ChangePwd/>} />

        
        </Routes>
    
      
    
    </>
    
        );
};

export default MyPage;