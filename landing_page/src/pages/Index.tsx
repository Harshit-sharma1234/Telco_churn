import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { ProjectSection } from "@/components/ProjectSection";
import { ImportanceSection } from "@/components/ImportanceSection";
import { DatasetSection } from "@/components/DatasetSection";
import { TechStackSection } from "@/components/TechStackSection";
import { TeamSection } from "@/components/TeamSection";
const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'project', 'importance', 'dataset', 'tech', 'team'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      
      <div id="hero">
        <Hero onNavigate={handleNavigate} />
      </div>
      
      <div id="project">
        <ProjectSection />
      </div>
      
      <div id="importance">
        <ImportanceSection />
      </div>
      
      <div id="dataset">
        <DatasetSection />
      </div>
      
      <div id="tech">
        <TechStackSection />
      </div>
      
      <div id="team">
        <TeamSection />
      </div>
    </div>
  );
};

export default Index;