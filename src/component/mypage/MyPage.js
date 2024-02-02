import React from 'react';
import {  Route, Routes,NavLink } from "react-router-dom";
import { ProtectedRoute } from '../../common/route/ProtectedRoute';
import MemberUpdateForm from '../memberUpdate/MemberUpdateForm';

const MyPage = () => {
    return (
    <>
    
    <NavLink
          to="/mypage/memberUpdate"
        >
          정보수정
        </NavLink>

        
    <Routes>
    <Route index element={<ProtectedRoute> 
    </ProtectedRoute>}/>

    <Route path='memberUpdate' element={<MemberUpdateForm/>} />


        
        </Routes>
    
    
    
    </>
    
        );
};

export default MyPage;