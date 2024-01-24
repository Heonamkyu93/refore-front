import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Main from './common/main/Main';
import Layout from './common/layout/Layout';
import JoinForm from './component/join/JoinForm';
function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
    <Route index element={<Main/>} />
    <Route path="/join" element={<JoinForm/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  </>
    );
}

export default App;
