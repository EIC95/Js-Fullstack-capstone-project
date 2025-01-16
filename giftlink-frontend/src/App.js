/*jshint esversion: 8 */
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/MainPage/MainPage';
import './components/LoginPage/LoginPage';
import './components/RegisterPage/RegisterPage';
import './components/DetailsPage/DetailsPage';
import './components/SearchPage/SearchPage';

function App() {

  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/app/login" element={<LoginPage />} />
          <Route path="/app/register" element={<RegisterPage />} />
          <Route path="/app/product/:productId" element={<DetailsPage />} />
          <Route path="/app/search" element={<SearchPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
