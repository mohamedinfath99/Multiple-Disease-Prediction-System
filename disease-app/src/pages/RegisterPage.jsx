
import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
// import loginImg from '../assets/aaa.avif';



const RegisterPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const navigate = useNavigate();

    const registerUser = (event) => {
        event.preventDefault();

        if (username.length === 0) {
            message.error("Username is required");
        } else if (email.length === 0) {
            message.error("Gmail is required");
        } else if (phone_number.length === 0) {
            message.error("Phone number is required");
        } else if (password.length === 0) {
            message.error("Password is required");
        } else {
            axios.post('http://127.0.0.1:5000/signup', {
                email: email,
                password: password,
                username: username,
                phone_number: phone_number
            })
                .then(function (response) {
                    console.log(response);
                    navigate("/login");
                })
                .catch(function (error) {
                    console.log(error, 'error');
                    if (error.response.status === 401) {
                        message.error("Invalid credentials");
                    }
                });
        }
    };
    // style={{ backgroundImage: `linear-gradient(181.26deg, rgba(176, 189, 231, 0.5) 1.31%, rgba(59, 54, 120, 0.1) 92.36%), url(${loginImg})`, backgroundSize: 'cover' }}
    return (
        <div className=" flex flex-col items-center justify-center bg-cover" style={{ marginTop: '90px', marginBottom: '90px' }}>

            <div className="bg-opacity-80 p-8 rounded-lg shadow-md max-w-md w-full" style={{ backgroundColor: 'rgba(236, 228, 228, 0.78)', width: 'min(calc(100% - 30px), 840px)', marginInline: 'auto', height: 'min(calc(100% - 30px), 476px)' }}>

                <h1 className="roboto-heading text-center" style={{ color: '#2D6FD1', textTransform: 'uppercase', fontWeight: '800', fontSize: '35px', lineHeight: '46.88px' }}>MediLand Hospital</h1>
                <p className="inter-heading text-center mt-2 mb-7" style={{ color: '#2D6FD1', textTransform: 'uppercase', fontWeight: '500', fontSize: '24px', lineHeight: '29.05px' }}>Register now</p>

                <form className='flex flex-col items-center justify-center' style={{ width: 'min(calc(100% - 10px), 1000px)', marginInline: 'auto' }}>

                    <div className="mb-4 bg-opacity-80 border border-2.5px solid #2C66BE rounded p-5 flex items-center" style={{ height: '55px', width: '100%', backgroundColor: '#05050513', borderBottom: '2px solid #2C66BE', marginInline: 'auto' }}>

                        <div className="pr-3">
                            <PersonIcon style={{ height: '30px', width: '30px', color: '#2D6FD1' }} />
                        </div>

                        <div className='' style={{ width: "263px", height: '51px', position: 'relative' }}>
                            <div className='roboto-heading ring-blue-300' style={{ fontWeight: "600", fontSize: '12px', lineHeight: "16px", letterSpacing: '0.4px', position: 'absolute', top: '2px', color: '#2D6FD1' }}>Name</div>

                            <input
                                type="text"
                                id="name"
                                value={username}
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                className="roboto-heading w-full px-2 py-2 border rounded"
                                placeholder="Enter your gmail"
                                style={{ backgroundColor: 'transparent', border: 'none', marginTop: '20px', height: '28px', outline: 'none', fontWeight: '400', fontSize: '16px', lineHeight: '24px', letterSpacing: '0.15px', color: '#000000DE' }}
                            />

                        </div>
                    </div>


                    <div className="mb-4 bg-opacity-80 border border-2.5px solid #2C66BE rounded p-5 flex items-center" style={{ height: '55px', width: '100%', backgroundColor: '#05050513', borderBottom: '2px solid #2C66BE', marginInline: 'auto' }}>

                        <div className="pr-3">
                            <EmailIcon style={{ height: '30px', width: '30px', color: '#2D6FD1' }} />
                        </div>

                        <div className='' style={{ width: "263px", height: '51px', position: 'relative' }}>
                            <div className='roboto-heading ring-blue-300' style={{ fontWeight: "600", fontSize: '12px', lineHeight: "16px", letterSpacing: '0.4px', position: 'absolute', top: '2px', color: '#2D6FD1' }}>Gmail</div>

                            <input
                                type="email"
                                id="gmail"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="roboto-heading w-full px-2 py-2 border rounded"
                                placeholder="Enter your gmail"
                                style={{ backgroundColor: 'transparent', border: 'none', marginTop: '20px', height: '28px', outline: 'none', fontWeight: '400', fontSize: '16px', lineHeight: '24px', letterSpacing: '0.15px', color: '#000000DE' }}
                            />

                        </div>
                    </div>


                    <div className="mb-4 bg-opacity-80 border border-2.5px solid #2C66BE rounded p-5 flex items-center" style={{ height: '55px', width: '100%', backgroundColor: '#05050513', borderBottom: '2px solid #2C66BE', marginInline: 'auto' }}>

                        <div className="pr-3">
                            <PhoneIcon style={{ height: '30px', width: '30px', color: '#2D6FD1' }} />
                        </div>

                        <div className='' style={{ width: "263px", height: '51px', position: 'relative' }}>
                            <div className='roboto-heading ring-blue-300' style={{ fontWeight: "600", fontSize: '12px', lineHeight: "16px", letterSpacing: '0.4px', position: 'absolute', top: '2px', color: '#2D6FD1' }}>Phone number</div>

                            <input
                                type="text"
                                id="gmail"
                                value={phone_number}
                                required
                                onChange={(e) => setPhone_number(e.target.value)}
                                className="roboto-heading w-full px-2 py-2 border rounded"
                                placeholder="Enter your gmail"
                                style={{ backgroundColor: 'transparent', border: 'none', marginTop: '20px', height: '28px', outline: 'none', fontWeight: '400', fontSize: '16px', lineHeight: '24px', letterSpacing: '0.15px', color: '#000000DE' }}
                            />

                        </div>
                    </div>


                    <div className="mb-4 bg-opacity-80 border border-2.5px solid #2C66BE rounded p-5 flex items-center" style={{ height: '55px', width: '100%', backgroundColor: '#05050513', borderBottom: '2px solid #2C66BE', marginInline: 'auto' }}>

                        <div className="pr-3">
                            <LockIcon style={{ height: '30px', width: '30px', color: '#2D6FD1' }} />
                        </div>

                        <div className='' style={{ width: "263px", height: '51px', position: 'relative' }}>
                            <div className='roboto-heading ring-blue-300' style={{ fontWeight: "600", fontSize: '12px', lineHeight: "16px", letterSpacing: '0.4px', position: 'absolute', top: '2px', color: '#2D6FD1' }}>Password</div>

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="roboto-heading w-full px-2 py-2 border rounded "
                                placeholder="Enter your password"
                                style={{ width: 'min(calc(100% - 30px), 840px)', marginInline: 'auto', backgroundColor: 'transparent', border: 'none', marginTop: '20px', height: '28px', outline: 'none', fontWeight: '400', fontSize: '16px', lineHeight: '24px', letterSpacing: '0.15px', color: '#000000DE' }}
                            />

                            <IconButton onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', top: '5px', right: '1px' }}>
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>

                        </div>
                    </div>

                    <button type="submit" onClick={(event) => registerUser(event)} className="py-2 px-4 text-white" style={{ width: 'min(calc(100% - 80px), 138px)', marginInline: 'auto', height: '38px', marginTop: '15px', borderRadius: "30px", fontWeight: "600", fontSize: '16px', lineHeight: '20px', color: '#FFFFFF', backgroundColor: '#2C66BE' }}>
                        Register
                    </button>

                </form>

                <div className="text-center" style={{ marginTop: '15px' }}>
                    <a href="/login" className="hover:underline" style={{ color: '#2C66BE', fontWeight: '500', fontSize: '16px', lineHeight: '20px' }}>Login Here</a>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;