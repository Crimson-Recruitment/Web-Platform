
import NavigationBar from './components/Navigationbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Footer from './components/Footer';
import Register from './pages/Register';
import CompanyLogin from './pages/CompanyLogin';
import CompanyRegister from './pages/CompanyRegister';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Jobs from './pages/Platform/Users/Jobs';


function App() {
  return (
  <Router>
  <NavigationBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/contact-us' element={<ContactUs/>}/>
      <Route path='/company-login' element={<CompanyLogin/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/company-register' element={<CompanyRegister/>}/>
      <Route path='/jobs' element={<Jobs/>}/>
    </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
