
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { HiStar } from 'react-icons/hi';
import '../../App.css'



const Testimonial = () => {
    return (
        <div className='container'>
            <div className='mt-[30px] lg:mt-[55px]'>
                <Swiper
                    modules={Pagination}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                    }}
                >
                    <SwiperSlide>
                        <div className='py-[30px] px-5 rounded-3'>
                            <div className='flex items-center gap-[13px]'>
                                <div>
                                    <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>Dilshan</h4>
                                    <div className='flex items-center gap-[2px]'>
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                    </div>
                                </div>
                            </div>

                            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>  "For my first appointment, I brought the requested documents, and the process was smooth. They even accommodated my busy schedule."</p>

                        </div>
                    </SwiperSlide>


                    <SwiperSlide>
                        <div className='py-[30px] px-5 rounded-3'>
                            <div className='flex items-center gap-[13px]'>
                                <div>
                                    <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>Lakshan</h4>
                                    <div className='flex items-center gap-[2px]'>
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                    </div>
                                </div>
                            </div>

                            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'> "I had an excellent experience making an appointment. The staff was very helpful, and the online scheduling system was user-friendly."</p>

                        </div>
                    </SwiperSlide>


                    <SwiperSlide>
                        <div className='py-[30px] px-5 rounded-3'>
                            <div className='flex items-center gap-[13px]'>
                                <div>
                                    <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>Bhanuka Silva </h4>
                                    <div className='flex items-center gap-[2px]'>
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                    </div>
                                </div>
                            </div>

                            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'> "I was pleased to find that the clinic accepts a wide range of insurance plans, making it convenient for me to access quality healthcare."</p>

                        </div>
                    </SwiperSlide>



                    <SwiperSlide>
                        <div className='py-[30px] px-5 rounded-3'>
                            <div className='flex items-center gap-[13px]'>
                                <div>
                                    <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>Chamara Fernando</h4>
                                    <div className='flex items-center gap-[2px]'>
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                        <HiStar className=" text-yellowColor w-[18px] h-5" />
                                    </div>
                                </div>
                            </div>

                            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>"Requesting a prescription refill was hassle-free. I appreciate the convenience of being able to do it online through their patient portal."</p>

                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    )
}

export default Testimonial
