
import { } from 'react-icons/ri'
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai'
import { Link } from 'react-router-dom'



const socialLinks = [
    {
        path: '',
        icon: <AiFillYoutube className='group-hover:text-white w-4 h-5' />
    },
    {
        path: '',
        icon: <AiFillInstagram className='group-hover:text-white w-4 h-5' />
    },
    {
        path: '',
        icon: <AiFillFacebook className='group-hover:text-white w-4 h-5' />
    },
    {
        path: '',
        icon: <AiFillLinkedin className='group-hover:text-white w-4 h-5' />
    },
]


const quickLinks1 = [
    {
        path: '/',
        display: 'Home'
    },
    {
        path: '/',
        display: 'About Us'
    },
    {
        path: '/services',
        display: 'Services'
    },
    {
        path: '/',
        display: 'Blog'
    },
]



const quickLinks2 = [
    {
        path: '/find-a-doctor',
        display: 'Find a Doctor'
    },
    {
        path: '/',
        display: 'Request an Appointment'
    },
    {
        path: '/',
        display: 'Find a Location'
    },
    {
        path: '/',
        display: 'Get a Opinion'
    },
]



const quickLinks3 = [
    {
        path: '/',
        display: 'Donate'
    },
    {
        path: '/contact',
        display: 'Contact Us'
    },
]



const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <footer className='pb-16 pt-10'>
            <div className='container'>
                <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
                    <div>
                        <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>
                            Copyright @ {year} developed by MediLand Hospital all rigth reserved
                        </p>


                        <div className='flex items-center gap-3 mt-4'>
                            {
                                socialLinks.map((link, index) => (
                                    <Link
                                        to={link.path}
                                        key={index}
                                        className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'
                                    >
                                        {link.icon}
                                    </Link>))
                            }
                        </div>
                    </div>

                    <div>
                        <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>Quick Links</h2>

                        <ul>
                            {quickLinks1.map((item, index) => (
                                <li key={index} className='mb-4'>
                                    <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>{item.display}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>I want to: </h2>

                        <ul>
                            {quickLinks2.map((item, index) => (
                                <li key={index} className='mb-4'>
                                    <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>{item.display}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>Support</h2>

                        <ul>
                            {quickLinks3.map((item, index) => (
                                <li key={index} className='mb-4'>
                                    <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>{item.display}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                </div>
            </div>
        </footer>
    )
}

export default Footer
