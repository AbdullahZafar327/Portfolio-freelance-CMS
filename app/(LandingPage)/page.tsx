import About from "@/components/Protfolio-sections/About";
import Hero from "@/components/Protfolio-sections/Hero";
import Portfolio from "@/components/Protfolio-sections/Portfolio";
import Service from "@/components/Protfolio-sections/Service";
import Skills from "@/components/Protfolio-sections/Skills";
import Navbar from "@/components/Protfolio-sections/navbar";
import { InitialUser } from "@/lib/initial-user";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const Home = async () => {
   await InitialUser();
   const user = await currentUser()
   const profile = JSON.parse(JSON.stringify(user))

  return (
    <div>
      <Navbar profile={profile}/>
      <Hero />
      <About />
      <Portfolio />
      <Skills/>
      <Service/>
    </div>
  );
};

export default Home;
