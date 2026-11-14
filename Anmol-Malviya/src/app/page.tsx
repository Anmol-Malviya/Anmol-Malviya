import Navigation from "@/components/Navigation";
import CinematicStage from "@/components/CinematicStage";
import ProjectsSection from "@/components/ProjectsSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen w-full bg-[#FFFCF8] text-[#4B4B4B] selection:bg-[#FFE0C2] selection:text-[#4B4B4B] overflow-x-hidden">
        {/* Persistent Floating Navigation with Section Tracking */}
        <Navigation />

        {/* Master Fullscreen 16:9 Cinematic Stage → Minimizes into DEAD CENTER (4:3 Window) */}
        <CinematicStage />

        {/* Section 02: Project Showcase (Things I've brought to life) */}
        <ProjectsSection />

        {/* Section 03: Career Journey (Every chapter builds the next) */}
        <JourneySection />

        {/* Section 04: Contact (Have an idea? Let's build it) */}
        <ContactSection />
      </div>
    </SmoothScrollProvider>
  );
}
