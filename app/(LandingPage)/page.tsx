import About from "@/components/About";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Service from "@/components/Service";
import Skills from "@/components/Skills";
import Navbar from "@/components/navbar";
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
