import React from 'react';
import { ConfigProvider } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AlumniDirectory from './pages/AlumniDirectory';
import Profile from './pages/Profile';
import News from './pages/News';
import Activities from './pages/Activities';
import Recruitment from './pages/Recruitment';
import Forum from './pages/Forum';
import Donation from './pages/Donation';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/alumni" element={<AlumniDirectory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/news" element={<News />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/donation" element={<Donation />} />
      </Routes>
    </ConfigProvider>
  );
};

export default App;
