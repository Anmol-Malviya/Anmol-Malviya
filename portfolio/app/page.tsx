"use client";
import dynamic from "next/dynamic";
const StoryExperience = dynamic(() => import("../components/StoryExperience"), { ssr: false, loading: () => <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#f7f9fc",color:"#24445f"}}>Preparing the experience…</div> });
export default function Home(){ return <StoryExperience/>; }
