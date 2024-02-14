import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Main from './common/main/Main';
import Layout from './common/layout/Layout';
import JoinForm from './component/join/JoinForm';
import LoginForm from './component/login/loginForm';
import MyPage from './component/mypage/MyPage';
import { ProtectedRoute } from './common/route/ProtectedRoute';
import Upimg from './component/upimg/Upimg';
import Sound from './component/sound/Sound';
function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
    <Route index element={<Main/>} />
    <Route path="/join" element={<JoinForm/>}/>
    <Route path="/login" element={<LoginForm/>}/>
    <Route path="/sound" element={<Sound/>}/>
    <Route path='/mypage/*' element={
      <ProtectedRoute>
        <MyPage />
        </ProtectedRoute>
    }/>


<Route path='/upimg' element={
        <Upimg/>
    }/>




    </Route>

    
    </Routes>
    </BrowserRouter>
  </>
    );
}

export default App;
