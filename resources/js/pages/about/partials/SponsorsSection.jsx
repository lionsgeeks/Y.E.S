import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// import custom context if available



// Import your sponsor images (adjust paths to your Inertia structure)
const ucgc = "/assets/images/sponsors/ucgc.jpg";
const lionsgeek = "/assets/images/sponsors/lionsgeek.png";
const jadara = "/assets/images/sponsors/Jadaralogo.png";
const smala = "/assets/images/sponsors/happylogo.webp";
import TransText from "@/components/TransText";

export default function SponsorsSection() {
    const { selectedLanguage } = "en";

    return (
        <section
            className={`px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${selectedLanguage === "ar" && "text-end"
                }`}
        >
            <h2 className="text-xl text-alpha font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
                <TransText en="Partners & Sponsors" ar="الشركاء والممولون" />
            </h2>

            <div
                className={`flex flex-wrap px-4 gap-x-6 gap-y-8 md:px-6 md:gap-x-10 lg:gap-x-16 lg:px-12 ${selectedLanguage === "ar" ? "flex-row-reverse" : "flex-row"
                    }`}
            >
                <Swiper
                    slidesPerView={3}
                    loop={true}
                    speed={3000}
                    freeMode={true}
                    autoplay={{
                        delay: 100,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, FreeMode]}
                >
                    {[ucgc, lionsgeek, jadara, smala].map((spon, index) => (
                        <SwiperSlide
                            className="aspect-[1/0.5] flex items-center justify-center"
                            key={index}
                        >
                            <img
                                src={spon}
                                className={`${spon === ucgc ? "w-[140px]" : "w-[100px]"}`}
                                alt="Sponsor logo"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
