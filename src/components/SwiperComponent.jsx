import Card from "./Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SwiperComponent({ title, items, pc_views, mo_views, cardVariant = 'default' }) {
  return (
    <section className="bg-black py-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-[32px] font-bold mb-6">{title}</h2>
        <Swiper modules={[Navigation, Pagination]} spaceBetween={24} navigation breakpoints={{ 1024: { slidesPerView: pc_views, },960: { slidesPerView: mo_views, } }} className="movie-swiper" >
          {items.map((m) => (
            <SwiperSlide key={m.id}>
              <Card movie={m} variant={cardVariant} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}