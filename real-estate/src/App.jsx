// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import PropertyPage from './components/PropertyPage';
import AddPropertyPage from './components/AddPropertyPage';
import Registration from './components/Registration';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate replace to='/register'></Navigate>}></Route>
          <Route path='/register' Component={Registration}></Route>
          <Route path='/login' Component={Login}></Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
