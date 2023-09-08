
import Home from './../pages/Home';
import Services from './../pages/Services';
import Login from './../pages/LoginPage';
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
        </Routes>
    )
}

export default Router
