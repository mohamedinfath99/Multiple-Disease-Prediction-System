import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

export default function HomePage() {
    return (
        <div className=''>
            <div>
                <Navbar showLinks={true} />
                <div className="roboto-heading fixed bottom-1 w-full text-center text-gray-500" style={{ fontSize: '16px', lineHeight: "19px", color: '#FFFFFF' }}>
                    <Footer />
                </div>

            </div>
        </div>
    );
}