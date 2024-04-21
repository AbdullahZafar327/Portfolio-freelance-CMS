import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.webm";
import video3 from "../assets/video3.mp4";

import AiSaas from "../public/Saas.png";
import discord from "../public/discord.png";
import Ecommerce from "../public/ecommerce.jpg";
import Charity from "../public/charity.png";
import SocialMedia from "../public/social media.png";
import {
  Html,
  css,
  javascript,
  react,
  next,
  three,
  tailwind,
  material,
  node,
  express,
  mongodb,
  figma,
  spline,
  illustrator,
  photoshop,
  effects,
  git,
} from "./assets.js";

export const MyServices = [
  {
    name: "Web Coding / Saas",
    description:
      "Unlock end-to-end digital solutions with my full-stack services. From frontend finesse to backend brilliance,I craft tailored applications that elevate your business. Experience seamless integration and cutting-edge technology for a project that exceeds expectations.",
    videoLink: video1,
  },
  {
    name: "UX Design",
    description:
      "I blend creativity and functionality to craft visually stunning and intuitive interfaces that captivate users. From wire frames to prototypes, I transform concepts into engaging digital experiences that leave a lasting impression.",
    videoLink: video2,
  },
  {
    name: "3D Application",
    description:
      "We bring your online presence to life by integrating immersive 3D elements that enhance engagement and interaction. From dynamic product showcases to captivating environments,I push the boundaries of web design to deliver a truly memorable browsing experience.",
    videoLink: video3,
  },
];

export const Projects = [
  {
    name: "AI SaaS Application",
    Description:
      "Developed a visually stunning landing page and dashboard with the capability to generate AI images, prompts, and music using the ChatGPT API. Integrated a Stripe payment system gateway with a complimentary 5-generation limit.",
    sourceCode: "https://github.com/AbdullahZafar327/AI-Saas-App",
    thumbnail: AiSaas,
  },
  {
    name: "Discord Application",
    Description:
      "Developed a complete Discord system including servers, channels, and channel types such as audio, video, and text. Implemented Socket.io for real-time collaboration.",
    sourceCode: "https://github.com/AbdullahZafar327/Discord-Server",
    thumbnail: discord,
  },
  {
    name: "Ecommerce Brand UX/UI",
    Description:
      "Developed a lightning-fast Ecommerce system using Next.js SSR, featuring advanced payment processing and order tracking. Seamlessly integrated a Stripe payment gateway for dynamic checkout experiences.",
    sourceCode: "https://github.com/AbdullahZafar327/Ecommerce_StoreDigital",
    thumbnail: Ecommerce,
  },
  {
    name: "Charity Collections Dashboard",
    Description:
      "Designed a user-friendly and intuitive UX/UI for managing charity transactions, statistics, daily, monthly, and yearly collections. Implemented interactive graphs and charts to visualize data effectively.",
    sourceCode: "https://github.com/AbdullahZafar327/Charity_fronted",
    thumbnail: Charity,
  },
  {
    name: "Social Media Application",
    Description:
      "Built social media functionality for posting, liking, and searching content. Utilized React with Redux for efficient state management.",
    sourceCode: "https://github.com/AbdullahZafar327/SocialMemories-fronted",
    thumbnail: SocialMedia,
  },
];

export const technologies = [
  {
    name: "HTML",
    icon: Html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: react,
  },
  {
    name: "Next Js",
    icon: next,
  },
  {
    name: "Three JS",
    icon: three,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: node,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },

  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "Material UI",
    icon: material,
  },
  {
    name: "Spline",
    icon: spline,
  },
  {
    name: "Adobe illustrator",
    icon: illustrator,
  },
  {
    name: "after effects",
    icon: effects,
  },
];
