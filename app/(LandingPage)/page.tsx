import About from "@/components/Protfolio-sections/About";
import Hero from "@/components/Protfolio-sections/Hero";
import Portfolio from "@/components/Protfolio-sections/Portfolio";
import Service from "@/components/Protfolio-sections/Service";
import Skills from "@/components/Protfolio-sections/Skills";
import Navbar from "@/components/Protfolio-sections/navbar";
import { InitialUser } from "@/lib/initial-user";
import React from "react";

const Home = async () => {
   await InitialUser();
   
  return (
    <div className="items-center flex flex-col w-full max-w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Skills/>
      <Service/>
    </div>
  );
};

export default Home;
