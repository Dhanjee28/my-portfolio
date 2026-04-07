import { useState, useEffect, useRef } from "react";

import { SKILLS, PROJECTS, TYPING_STRINGS } from "./data/portfolioData";
import { useTyping, useReveal } from "./hooks/usePortfolio";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import "./styles/globals.css";

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [skillCat, setSkillCat] = useState("All");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);

  const typedText = useTyping(TYPING_STRINGS);
  useReveal();

  // Trigger skill bar animations when Skills section enters viewport
  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSkillsVisible(true),
      { threshold: 0.2 }
    );
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={dark ? "" : "light"}>
      <Navbar
        dark={dark}
        setDark={setDark}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <Hero typedText={typedText} />

      <About />

      <Skills
        skills={SKILLS}
        skillCat={skillCat}
        setSkillCat={setSkillCat}
        skillsRef={skillsRef}
        skillsVisible={skillsVisible}
      />

      <Projects projects={PROJECTS} />

      <Contact />

      <Footer />
    </div>
  );
}