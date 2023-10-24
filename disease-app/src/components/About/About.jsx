// import { Link } from "react-router-dom";
import aboutImg from '../../assets/images/about.jpg';


const About = () => {
    return (
        <section>
            <div className="container">
                <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gao-0 flex-col lg:flex-row">

                    <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                        <img src={aboutImg} alt="img1" />
                    </div>

                    <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                        <h2 className="heading">Legacy of Mediland Hospital</h2>

                        <p className="text__para">"For the last two years, we've been honored to stand as a top healthcare institution, known for exceptional patient care."</p>

                        <p className="text__para mt-[30px]">"With a steadfast commitment to excellence, we have consistently ranked among the nation's best healthcare providers for the past two years."</p>


                        <p className="text__para mt-[30px]">"For two consecutive years, we've proudly maintained our position as a premier healthcare institution, specializing in outstanding patient treatment."</p>

                        {/* <Link to='/'><button className="btn">Learn More</button></Link> */}
                    </div>

                </div>

            </div>
        </section>
    )
}

export default About
