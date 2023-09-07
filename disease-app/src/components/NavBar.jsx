// import React, { useState } from 'react';
// import Button from './Button';
// import MenuIcon from '@mui/icons-material/Menu';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

// const Nav = () => {
//     let Links = [
//         { name: 'HOME', link: '/' },
//         { name: 'SERVICE', link: '/' },
//         { name: 'ABOUT', link: '/' },
//         { name: 'CONTACT', link: '/' },
//     ];
//     let [open, setOpen] = useState(false);
//     return (
//         <div className='shadow-md w-full fixed top-0 left-0' style={{ backgroundColor: '#1a0c3b' }}>
//             <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
//                 <div className='font-bold text-2xl cursor-pointer justify-center items-center font-[Poppins] text-white'>
//                     <span className='text-3xl text-indigo-600 mr-2  pt-2'>
//                         <i className='material-icons text-white'>
//                             <MonitorHeartIcon />
//                         </i>
//                     </span>
//                     MEDILAND HOSPITAL
//                 </div>

//                 <div
//                     onClick={() => setOpen(!open)}
//                     className='text-3xl flex justify-center items-center absolute right-8 top-6 cursor-pointer md:hidden'
//                 >
//                     <i className='material-icons'>{open ? <HighlightOffIcon style={{ color: '#fff' }} /> : <MenuIcon style={{ color: '#fff' }} />}</i>
//                 </div>

//                 <ul
//                     className={`md:flex md:items-center md:pb-0 pb-12 absolute  md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'
//                         }`} style={{ backgroundColor: "#1a0c3b" }}
//                 >
//                     {Links.map((link) => (
//                         <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
//                             <a href={link.link} className=' text-white hover:text-gray-400 duration-500'>
//                                 {link.name}
//                             </a>
//                         </li>
//                     ))}
//                     <Button> <a a href='/login'>LOGIN</a></Button>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Nav;


import React, { useState } from 'react';
import Button from './Button';
import MenuIcon from '@mui/icons-material/Menu';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const NavBar = ({ showLinks }) => {
    const [open, setOpen] = useState(false);

    const Links = [
        { name: 'HOME', link: '/' },
        { name: 'SERVICE', link: '/' },
        { name: 'ABOUT', link: '/' },
        { name: 'CONTACT', link: '/' },
    ];

    return (
        <div className='shadow-md w-full ' style={{ backgroundColor: '#1a0c3b' }}>
            <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer justify-center items-center font-[Poppins] text-white'>
                    <span className='text-3xl text-indigo-600 mr-2  pt-2'>
                        <i className='material-icons text-white'>
                            <MonitorHeartIcon />
                        </i>
                    </span>
                    MEDILAND HOSPITAL
                </div>

                {/* Conditionally render the menu icon */}
                <div
                    onClick={() => setOpen(!open)}
                    className='text-3xl flex justify-center items-center absolute right-8 top-6 cursor-pointer md:hidden'
                >
                    <i className='material-icons'>
                        {showLinks ? (open ? <HighlightOffIcon style={{ color: '#fff' }} /> : <MenuIcon style={{ color: '#fff' }} />) : null}
                    </i>
                </div>

                {showLinks && ( // Conditionally render links based on showLinks prop
                    <ul
                        className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'} `}
                        style={{ backgroundColor: "#1a0c3b" }}
                    >
                        {Links.map((link) => (
                            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                                <a href={link.link} className=' text-white hover:text-gray-400 duration-500'>
                                    {link.name}
                                </a>
                            </li>
                        ))}
                        <Button> <a href='/login'>LOGIN</a></Button>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NavBar;
