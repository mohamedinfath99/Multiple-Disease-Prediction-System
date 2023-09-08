// import userImg from '../../assets/images/avatar-icon.png';
import { NavLink, Link } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi'
import { useEffect, useRef } from 'react';
import '../../App.css'

const navLinks = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/doctor',
        display: 'Find a Doctor'
    },
    {
        path: '/services',
        display: 'Services'
    },
    {
        path: '/contact',
        display: 'Contact'
    },
]


const Header = () => {

    const headerRef = useRef(null)
    const menuRef = useRef(null)

    const handleStickyHeader = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header')
            }
            else {
                headerRef.current.classList.remove('sticky__header')
            }
        })
    };


    useEffect(() => {
        handleStickyHeader()

        return () => window.removeEventListener('scroll', handleStickyHeader)
    });


    const toggleMenu = () => menuRef.current.classList.toggle('show_menu')

    return (
        <header className='header flex items-center' ref={headerRef}>
            <div className='container'>
                <div className='flex items-center justify-between'>


                    <div>
                        <h1 className='text-[24px] leading-[46px] text-[#2b4758] font-[800] md:text-[26px] md:leading-[70px]'>MediLand Hospital</h1>
                    </div>


                    <div className='navigation' ref={menuRef} onClick={toggleMenu}>
                        <ul className='menu flex items-center gap-[2.7rem]'>
                            {
                                navLinks.map((links, index) => <li key={index}>
                                    <NavLink to={links.path}
                                        className={(navClass) =>
                                            navClass.isActive
                                                ? "text-primaryColor text-[16px] leading-7 font-[600]"
                                                : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'
                                        }>
                                        {links.display}
                                    </NavLink>
                                </li>)
                            }
                        </ul>
                    </div>


                    <div className='flex items-center gap-4'>
                        <div className='hidden'>
                            <Link>
                                <figure className='w-[35px] h-[35px] rounded-full'>
                                    {/* <img src={userImg} alt='image' className='w-full rounded-full cursor-pointer' /> */}
                                </figure>
                            </Link>
                        </div>


                        <Link to='/login'>
                            <button className='bg-primaryColor py-2 px-6 text-white font-[600 h-[44px] flex items-center justify-center rounded-[50px]'>Login</button>
                        </Link>


                        <span className='md:hidden' onClick={toggleMenu}>
                            <BiMenu className='w-6 h-6 cursor-pointer' />
                        </span>


                    </div>


                </div>
            </div>
        </header>
    )
}

export default Header
