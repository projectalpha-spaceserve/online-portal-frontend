import { useRef } from "react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatAmount } from "../constants/helper";
import InfoCard from "./InfoCard";

function DashboardSlider({ data, showBalance }) {
  const mask = "••••••";

  const swiperRef = useRef(null);

  return (
    <div className="overflow-hidden z-10">
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={20}
        speed={800}
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        <SwiperSlide>
          <InfoCard
            title="Net Worth"
            nairaAmount={
              showBalance ? formatAmount(data?.overall_balance) : mask
            }
            usdAmount="0.00"
          />
        </SwiperSlide>

        <SwiperSlide>
          <InfoCard
            title="Trust Investment"
            nairaAmount={showBalance ? formatAmount(data?.trust_balance) : mask}
            bgColor="bg-brand-400"
          />
        </SwiperSlide>

        <SwiperSlide>
          <InfoCard
            title="Mutual Funds"
            nairaAmount={
              showBalance ? formatAmount(data?.mutual_fund_balance) : mask
            }
            bgColor="bg-brand-800"
          />
        </SwiperSlide>
      </Swiper>

      {/* Navigation Buttons */}
      <div className="flex lg:hidden items-center justify-end mt-3">
        <button
          className="mr-3 bg-brand-400 text-white p-1 md:px-2"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <HiArrowLongLeft className="w-5 h-5" />
        </button>

        <button
          className="bg-brand-400 text-white p-1 md:px-2"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <HiArrowLongRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default DashboardSlider;
