
import NavigationBar from './components/Navigationbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Footer from './components/footer';

function App() {
  return (
  <Router>
  <NavigationBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
