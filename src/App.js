import './App.css';
import Footer from './common/footer/Footer';
import Header from './common/header/Header';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
  <>
    <BrowserRouter>
  <Header/>

    <Footer/>
    </BrowserRouter>
  </>
    );
}

export default App;
