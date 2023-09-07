import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Router from "../routes/Router"


const LayoutHome = () => {
    return (
        <>
            <Header />
            <main>
                <Router />
            </main>
            <Footer />
        </>
    )
}

export default LayoutHome
