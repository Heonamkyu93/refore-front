import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Main from './common/main/Main';
import Layout from './common/layout/Layout';
import JoinForm from './component/join/JoinForm';
import LoginForm from './component/login/loginForm';
import MyPage from './component/mypage/MyPage';
import { ProtectedRoute } from './common/route/ProtectedRoute';
import HereOrTogo from './component/hereOrTogo/HereOrTogo';
import MenuInsert from './component/menuInsert/MenuInsert';
import MenuList from './component/menuList/MenuList';
function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
    <Route index element={<HereOrTogo/>} />
    <Route path="/join" element={<JoinForm/>}/>
    <Route path="/list" element={<MenuList/>}/>
    <Route path="/order" element={<HereOrTogo/>}/>
    <Route path="/login" element={<LoginForm/>}/>
    <Route path='/mypage/*' element={
      <ProtectedRoute>
        <MyPage />
        </ProtectedRoute>
    }/>


<Route path="/insert" element={<MenuInsert/>}/>


    </Route>

    
    </Routes>
    </BrowserRouter>
  </>
    );
}

export default App;
