import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function Banner() {
    return (
        <section className="flex mb-4">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                autoplay={{delay:6000}}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}>

                <SwiperSlide> <img className="w-full h-[600px]  rounded-[30px]" src="/banner_1.jpg" alt="배너" /></SwiperSlide>
                <SwiperSlide><img className="w-full h-[600px]  rounded-[30px]" src="/banner_6.jpg" alt="배너" /></SwiperSlide>
                <SwiperSlide><img className="w-full h-[600px]  rounded-[30px]" src="/banner_7.jpg" alt="배너" /></SwiperSlide>
                <SwiperSlide><img className="w-full h-[600px]  rounded-[30px]" src="/banner3.jpg" alt="배너" /></SwiperSlide>
            </Swiper>
        </section>

    )
}

export default Banner