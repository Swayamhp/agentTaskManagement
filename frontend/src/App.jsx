import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUser } from './components/UserContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import UserPage from './pages/UserPage.jsx';
import { useEffect } from 'react';
import RegisterPage from './pages/RegisterPage.jsx';


function App() {
  const { user,setUser } = useUser();
useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("user"));
      setUser(data);
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/signup'element={<RegisterPage/>}/>
        <Route path="/dashboard" element={user?.isAdmin?<AdminPage/>:<UserPage/>}/>
        <Route path="*" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;



