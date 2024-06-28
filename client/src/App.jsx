import './App.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Chat from './pages/chat/Chat';

function App() {
  const { user } = useContext(AuthContext);

  // console.log("User:", user); // Debugging step

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home/> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/chat" element={!user ? <Home /> : <Chat />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
