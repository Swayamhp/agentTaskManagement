import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUser } from './components/UserContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import UserPage from './pages/UserPage.jsx';
import { useEffect } from 'react';


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
        <Route path="/dashboard" element={user?.isAdmin?<AdminPage/>:<UserPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;



