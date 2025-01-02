import AboutUs from "@/components/AboutUs";
import Cards from "@/components/Cards";
import Hero from "@/components/Hero";
import Subscribe from "@/components/Subscribe";
import Testimonials from "@/components/Testiominals";
import Image from "next/image";


export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Cards />
      <Subscribe />
      <Testimonials />
       
      </div>
  );
}
