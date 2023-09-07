// import { Routes, Route } from 'react-router-dom';
// import './App.css';
// import HomePage from "./pages/HomePage";
// import LoginPage from './pages/LoginPage'
// import RegisterPage from './pages/RegisterPage'
// import AdminDashboard from './pages/AdminDashboard';
// import DiabetesDisease from './pages/DiabetesDisease';
// import HeartDisease from './pages/HeartDisease';
// import ParkinsonDisease from './pages/ParkinsonDisease';


// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/adminDashboard" element={<AdminDashboard />} />
//         <Route path="/diabetesDisease" element={<DiabetesDisease />} />
//         <Route path="/heartDisease" element={<HeartDisease />} />
//         <Route path="/parkinsonDisease" element={<ParkinsonDisease />} />
//       </Routes>
//     </>
//   );
// }

// export default App;



import React from 'react'
import LayoutHome from './layout/LayoutHome'

function App() {
  return (
    <>
      <LayoutHome />
    </>
  )
}

export default App
