
import Home from './../pages/Home';
import Services from './../pages/Services';
import Login from './../pages/LoginPage';
import DiabetesDisease from './../pages/DiabetesDisease';
import HeartDisease from './../pages/HeartDisease';
import ParkinsonDisease from './../pages/ParkinsonDisease';
import AdminDashboard from './../pages/AdminDashboard';
import Signup from './../pages/RegisterPage';
import Contact from './../pages/Contact';
import DoctorDetails from './../pages/Doctor/DoctorDetails';
import Doctor from './../pages/Doctor/Doctor';
import { Routes, Route } from 'react-router-dom';


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/doctor' element={<Doctor />} />
            <Route path='/doctor/:id' element={<DoctorDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/services' element={<Services />} />
            <Route path='/adminDashboard' element={<AdminDashboard />} />
            <Route path='/diabetesDisease' element={<DiabetesDisease />} />
            <Route path='/heartDisease' element={<HeartDisease />} />
            <Route path='/parkinsonDisease' element={<ParkinsonDisease />} />
        </Routes>
    )
}

export default Router
