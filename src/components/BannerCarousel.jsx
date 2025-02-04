import { useState, useEffect, useRef } from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function BannerCarousel() {

  const banners = [
    { title: "New Arrivals", subtitle: "Shop the latest trends", image: "https://plus.unsplash.com/premium_photo-1679924471066-dd984e92f395?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Winter Collection", subtitle: "Stay warm in style", image: "https://plus.unsplash.com/premium_photo-1679924471066-dd984e92f395?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Exclusive Offers", subtitle: "Up to 50% off", image: "https://plus.unsplash.com/premium_photo-1679924471066-dd984e92f395?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];
  
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
  <div className="w-full mx-auto relative overflow-hidden mb-3.5 px-4 sm:px-0">
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index} className="relative w-full">
            <Card className="w-full rounded-xl overflow-hidden shadow-lg">
              <CardContent className="relative w-full p-0">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center p-6">
                  <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                    {banner.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-lg mt-2">
                    {banner.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md" />
      <CarouselNext className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md" />
    </Carousel>
  </div>
);

}
