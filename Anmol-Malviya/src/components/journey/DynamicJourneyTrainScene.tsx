"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { JOURNEY_MILESTONES, JourneyMilestone } from "./journeyData";

interface TrainSceneProps {
  scrollProgress: number; // 0 to 1
  onHoverMilestone?: (index: number | null) => void;
}

// -------------------------------------------------------------
// 1. BESPOKE HIGH-SPEED STREAMLINED LOCOMOTIVE
// Exactly matching the reference image:
// - Aerodynamic rounded bullet-train nose
// - Front glowing circular headlight with warm amber rim
// - Tinted gold-reflection panoramic windshield
// - Forest sage green aerodynamic racing stripe (#4D7C45)
// - Olive sage green roof cap (#4D7C45)
// - Crisp side branding: 3D cube logo + "ANMOL MALVIYA" + "DEVELOPER • BUILDER • LEARNER"
// - Three illuminated glowing-ring wheels with black centers
// -------------------------------------------------------------
function HighSpeedLocomotive({ xPos }: { xPos: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Side Branding Canvas Texture (High resolution)
  const brandingTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Warm ivory ceramic background matching the train body
    ctx.fillStyle = "#FFFDF8";
    ctx.fillRect(0, 0, 800, 400);

    // 1. Minimal 3D Wireframe Cube Logo in charcoal/gold
    const cx = 400;
    const cy = 110;
    const s = 34;
    ctx.strokeStyle = "#292821";
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";

    // Top face
    ctx.beginPath();
    ctx.moveTo(cx, cy - s);
    ctx.lineTo(cx + s * 0.866, cy - s * 0.5);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx - s * 0.866, cy - s * 0.5);
    ctx.closePath();
    ctx.stroke();

    // Bottom vertical lines
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.866, cy - s * 0.5);
    ctx.lineTo(cx - s * 0.866, cy + s * 0.5);
    ctx.lineTo(cx, cy + s);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + s * 0.866, cy - s * 0.5);
    ctx.lineTo(cx + s * 0.866, cy + s * 0.5);
    ctx.lineTo(cx, cy + s);
    ctx.stroke();

    // 2. Bold Brand Typography: ANMOL MALVIYA
    ctx.fillStyle = "#292821";
    ctx.font = "800 50px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ANMOL MALVIYA", 400, 205);

    // 3. Subtitle: DEVELOPER • BUILDER • LEARNER
    ctx.fillStyle = "#858174";
    ctx.font = "600 22px monospace";
    ctx.letterSpacing = "4px";
    ctx.fillText("DEVELOPER • BUILDER • LEARNER", 400, 250);

    // 4. Forest Green Swoosh Stripe at bottom of side texture
    ctx.fillStyle = "#4D7C45";
    ctx.beginPath();
    ctx.moveTo(60, 340);
    ctx.bezierCurveTo(250, 340, 450, 305, 740, 305);
    ctx.lineTo(740, 345);
    ctx.bezierCurveTo(450, 345, 250, 380, 60, 380);
    ctx.closePath();
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }, []);

  return (
    <group ref={groupRef} position={[xPos, 0, 0]}>
      {/* 1. Main Bullet Train Locomotive Body (Rounded Warm Ivory) */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 2.1, 2.2]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.22} metalness={0.08} />
      </mesh>

      {/* Aerodynamic Curving Nose (Front bullet contour) */}
      <mesh position={[-2.4, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.92, 1.12, 1.1, 32]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.22} metalness={0.08} />
      </mesh>
      <mesh position={[-2.85, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <sphereGeometry args={[0.9, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.25} metalness={0.08} />
      </mesh>

      {/* 2. Forest Green Roof Trim & Aerodynamic Pod (#4D7C45) */}
      <mesh position={[-0.2, 1.56, 0]}>
        <boxGeometry args={[3.8, 0.18, 1.7]} />
        <meshStandardMaterial color="#4D7C45" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0.2, 1.68, 0]}>
        <cylinderGeometry args={[0.4, 0.55, 0.22, 24]} />
        <meshStandardMaterial color="#4A5844" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* 3. Aerodynamic Tinted Cockpit Windshield */}
      <mesh position={[-2.1, 0.85, 0]} rotation={[0, 0, -0.42]}>
        <boxGeometry args={[1.5, 0.88, 1.85]} />
        <meshStandardMaterial color="#24221E" roughness={0.1} metalness={0.85} />
      </mesh>

      {/* Side Cabin Passenger Window */}
      <mesh position={[-0.9, 0.82, 1.11]}>
        <planeGeometry args={[1.6, 0.72]} />
        <meshStandardMaterial color="#24221E" roughness={0.1} metalness={0.85} />
      </mesh>
      <mesh position={[-0.9, 0.82, -1.11]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.6, 0.72]} />
        <meshStandardMaterial color="#24221E" roughness={0.1} metalness={0.85} />
      </mesh>

      {/* 4. Large Circular Front Headlight with Warm Halo Ring */}
      <group position={[-3.15, -0.05, 0]}>
        {/* Outer Champagne Bezel Ring */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.55, 0.55, 0.22, 32]} />
          <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Glowing Illuminated Center Disc */}
        <mesh position={[-0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.42, 0.42, 0.08, 32]} />
          <meshBasicMaterial color="#FFF1CC" />
        </mesh>
        {/* Powerful Forward Warm Light Beam */}
        <pointLight position={[-0.8, 0, 0]} intensity={6.0} distance={15} color="#FFE6AA" />
      </group>

      {/* 5. Locomotive Side Branding Panel */}
      {brandingTexture && (
        <>
          <mesh position={[0.7, 0.45, 1.11]}>
            <planeGeometry args={[3.2, 1.6]} />
            <meshBasicMaterial map={brandingTexture} />
          </mesh>
          <mesh position={[0.7, 0.45, -1.11]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[3.2, 1.6]} />
            <meshBasicMaterial map={brandingTexture} />
          </mesh>
        </>
      )}

      {/* 6. Lower Sleek Chassis Skirt with Olive Underside */}
      <mesh position={[0, -0.42, 0]} castShadow>
        <boxGeometry args={[4.9, 0.35, 2.05]} />
        <meshStandardMaterial color="#3C4B39" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* 7. THREE ILLUMINATED GLOWING-RING WHEELS (Exactly matching reference) */}
      {[-1.35, 0.0, 1.35].map((wX, idx) => (
        <group key={idx}>
          {/* Left Side Wheel (Front facing camera) */}
          <group position={[wX, -0.68, 1.08]}>
            {/* Dark graphite tire core */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.44, 0.44, 0.16, 32]} />
              <meshStandardMaterial color="#292821" roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Illuminated Glowing Champagne-White Ring Rim */}
            <mesh position={[0, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.26, 0.38, 32]} />
              <meshBasicMaterial color="#FFF5D6" side={THREE.DoubleSide} />
            </mesh>
            {/* Center Hub */}
            <mesh position={[0, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.05, 24]} />
              <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Soft Wheel Contact Glow */}
            <pointLight position={[0, 0, 0.25]} intensity={0.9} distance={1.8} color="#FFE6AA" />
          </group>

          {/* Right Side Wheel (Back side) */}
          <group position={[wX, -0.68, -1.08]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.44, 0.44, 0.16, 32]} />
              <meshStandardMaterial color="#292821" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, -0.09]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.26, 0.38, 32]} />
              <meshBasicMaterial color="#FFF5D6" side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Rear Heavy-Duty Mechanical Coupler */}
      <mesh position={[2.5, -0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        <meshStandardMaterial color="#D8C8AD" roughness={0.25} metalness={0.8} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 2. BESPOKE CARRIAGE WAGONS CARRYING MINIMAL WARM-IVORY CARDS
// Exactly matching the reference image:
// - Capsule-like carriage body with olive green front/rear curved caps
// - Olive sage green lower carriage tray (#3C4B39)
// - Floating minimal warm-ivory card face:
//   * Header: "02 | ACHIEVEMENT" or "03 | EXPERIENCE"
//   * Bold title: "IUCEE Student Project Competition"
//   * Subtitle: "Presenting innovative student engineering solutions."
//   * Right side: Elegant soft pastel purple/lavender waveform graphic
// - Glowing illuminated ring wheels matching locomotive
// -------------------------------------------------------------
function HighSpeedCarriage({
  milestone,
  index,
  xPos,
  scrollProgress,
}: {
  milestone: JourneyMilestone;
  index: number;
  xPos: number;
  scrollProgress: number;
}) {
  // High-Resolution Card Face Canvas matching the reference image layout
  const cardTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1100;
    canvas.height = 620;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const W = 1100;
    const H = 620;
    const R = 36;

    // 1. Warm Ivory Card Surface (#FFFDF8)
    ctx.fillStyle = "#FFFDF8";
    ctx.beginPath();
    ctx.roundRect(14, 14, W - 28, H - 28, R);
    ctx.fill();

    // 2. Soft Gold / Beige Border (#EAE2D6)
    ctx.strokeStyle = milestone.highlight ? "#FFD6A6" : "#EAE2D6";
    ctx.lineWidth = milestone.highlight ? 4.5 : 2.5;
    ctx.stroke();

    // 3. TOP ROW: "02  |  ACHIEVEMENT"
    const leftPad = 75;
    const topPad = 95;

    // Small circular bullet
    ctx.fillStyle = "#4D7C45";
    ctx.beginPath();
    ctx.arc(leftPad - 20, topPad - 8, 7, 0, Math.PI * 2);
    ctx.fill();

    const carNum = String(index + 2).padStart(2, "0");
    ctx.fillStyle = "#292821";
    ctx.font = "700 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(carNum, leftPad, topPad);

    const numW = ctx.measureText(carNum).width;
    ctx.fillStyle = "#B3ACA0";
    ctx.font = "400 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(" | ", leftPad + numW + 8, topPad - 1);

    const slashW = ctx.measureText(" | ").width;
    ctx.fillStyle = "#858174";
    ctx.font = "600 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(milestone.category.toUpperCase(), leftPad + numW + slashW + 8, topPad);

    // 4. RIGHT SIDE ABSTRACT ARTWORK (Soft lavender waveform matching reference)
    const thumbW = 340;
    const thumbH = 260;
    const thumbX = W - leftPad - thumbW + 10;
    const thumbY = 160;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(thumbX, thumbY, thumbW, thumbH, 24);
    ctx.clip();

    // Subtle gradient base
    const grad = ctx.createLinearGradient(thumbX, thumbY, thumbX, thumbY + thumbH);
    grad.addColorStop(0, "#FBF9FE");
    grad.addColorStop(1, "#F3EDFC");
    ctx.fillStyle = grad;
    ctx.fillRect(thumbX, thumbY, thumbW, thumbH);

    // Flowing lavender ribbons (like the reference image)
    const waveGrad = ctx.createLinearGradient(thumbX, thumbY, thumbX + thumbW, thumbY + thumbH);
    waveGrad.addColorStop(0, "rgba(215, 195, 240, 0.55)");
    waveGrad.addColorStop(1, "rgba(175, 140, 220, 0.85)");
    ctx.fillStyle = waveGrad;
    ctx.beginPath();
    ctx.moveTo(thumbX, thumbY + thumbH * 0.75);
    ctx.bezierCurveTo(
      thumbX + thumbW * 0.4,
      thumbY + thumbH * 0.25,
      thumbX + thumbW * 0.65,
      thumbY + thumbH * 0.9,
      thumbX + thumbW,
      thumbY + thumbH * 0.4
    );
    ctx.lineTo(thumbX + thumbW, thumbY + thumbH);
    ctx.lineTo(thumbX, thumbY + thumbH);
    ctx.closePath();
    ctx.fill();

    // Second softer wave
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.beginPath();
    ctx.moveTo(thumbX, thumbY + thumbH * 0.55);
    ctx.bezierCurveTo(
      thumbX + thumbW * 0.35,
      thumbY + thumbH * 0.85,
      thumbX + thumbW * 0.75,
      thumbY + thumbH * 0.35,
      thumbX + thumbW,
      thumbY + thumbH * 0.65
    );
    ctx.lineTo(thumbX + thumbW, thumbY + thumbH);
    ctx.lineTo(thumbX, thumbY + thumbH);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // 5. MAIN CONTENT (LEFT SIDE)
    // Milestone Role / Title in Bold Typography
    const titleY = 215;
    ctx.fillStyle = "#292821";
    ctx.font = "800 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";

    // Clean word wrapping
    const maxWidth = thumbX - leftPad - 30;
    const titleWords = milestone.role.split(" ");
    let tLine1 = "";
    let tLine2 = "";
    for (const tw of titleWords) {
      if ((tLine1 + " " + tw).length < 24) {
        tLine1 += (tLine1 ? " " : "") + tw;
      } else {
        tLine2 += (tLine2 ? " " : "") + tw;
      }
    }
    ctx.fillText(tLine1, leftPad, titleY);
    if (tLine2) {
      ctx.fillText(tLine2, leftPad, titleY + 56);
    }

    // Institution
    const instY = tLine2 ? titleY + 115 : titleY + 62;
    ctx.fillStyle = "#4D7C45";
    ctx.font = "600 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(`↳ ${milestone.institution}`, leftPad, instY);

    // Short Details Description (#858174)
    ctx.fillStyle = "#858174";
    ctx.font = "400 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const descY = instY + 54;
    const descWords = milestone.details.split(" ");
    let dLine1 = "";
    let dLine2 = "";
    for (const dw of descWords) {
      if ((dLine1 + " " + dw).length < 38) {
        dLine1 += (dLine1 ? " " : "") + dw;
      } else {
        dLine2 += (dLine2 ? " " : "") + dw;
      }
    }
    ctx.fillText(dLine1, leftPad, descY);
    if (dLine2) {
      ctx.fillText(dLine2, leftPad, descY + 36);
    }

    // 6. BOTTOM ROW: Small Period Pill (#F4EFE6)
    const bottomY = H - 75;
    ctx.font = "600 22px monospace";
    const periodW = ctx.measureText(milestone.period).width + 48;
    ctx.fillStyle = "#F4EFE6";
    ctx.beginPath();
    ctx.roundRect(leftPad, bottomY - 30, periodW, 44, 14);
    ctx.fill();
    ctx.strokeStyle = "#E8E0D2";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = "#292821";
    ctx.fillText(milestone.period, leftPad + 24, bottomY);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, [milestone, index]);

  return (
    <group position={[xPos, 0, 0]}>
      {/* 1. Lower Carriage Flatbed Skirt in Olive Green (#3C4B39) */}
      <mesh position={[0, -0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 0.32, 2.05]} />
        <meshStandardMaterial color="#3C4B39" roughness={0.35} metalness={0.2} />
      </mesh>

      {/* 2. Forest Green End-Caps on Wagon Frame (Curved olive border ends) */}
      <mesh position={[-2.6, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 2.4, 24]} />
        <meshStandardMaterial color="#4D7C45" roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[2.6, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 2.4, 24]} />
        <meshStandardMaterial color="#4D7C45" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* 3. Mechanical Coupler to Next Car */}
      <mesh position={[2.85, -0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.55, 16]} />
        <meshStandardMaterial color="#D8C8AD" roughness={0.25} metalness={0.8} />
      </mesh>

      {/* 4. TWO ILLUMINATED GLOWING-RING WHEELS PER CARRIAGE (Matching reference) */}
      {[-1.6, 1.6].map((wX, idx) => (
        <group key={idx}>
          {/* Front Wheel */}
          <group position={[wX, -0.68, 1.05]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.15, 32]} />
              <meshStandardMaterial color="#292821" roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Glowing Champagne-White Ring Rim */}
            <mesh position={[0, 0, 0.085]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.24, 0.36, 32]} />
              <meshBasicMaterial color="#FFF5D6" side={THREE.DoubleSide} />
            </mesh>
            {/* Center Hub */}
            <mesh position={[0, 0, 0.085]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.04, 24]} />
              <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
            </mesh>
            <pointLight position={[0, 0, 0.2]} intensity={0.8} distance={1.6} color="#FFE6AA" />
          </group>

          {/* Back Wheel */}
          <group position={[wX, -0.68, -1.05]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.15, 32]} />
              <meshStandardMaterial color="#292821" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, -0.085]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.24, 0.36, 32]} />
              <meshBasicMaterial color="#FFF5D6" side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      ))}

      {/* 5. 3D Capsule-Style Showcase Card (Mounted seamlessly on the carriage) */}
      {cardTexture && (
        <group position={[0, 1.25, 0]}>
          {/* Physical 3D Card Thickness Box in Warm White */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.8, 2.7, 0.12]} />
            <meshStandardMaterial color="#FFFDF8" roughness={0.2} metalness={0.08} />
          </mesh>

          {/* Front Face Texture */}
          <mesh position={[0, 0, 0.065]}>
            <planeGeometry args={[4.75, 2.65]} />
            <meshBasicMaterial map={cardTexture} />
          </mesh>

          {/* Back Face Texture */}
          <mesh position={[0, 0, -0.065]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[4.75, 2.65]} />
            <meshBasicMaterial map={cardTexture} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// 3. 3D RAILROAD TRACKS (Continuous metallic rails + cross-ties)
// Matching reference image with warm track reflection
// -------------------------------------------------------------
function RailroadTracks() {
  return (
    <group position={[0, -0.88, 0]}>
      {/* Front Polished Champagne Rail */}
      <mesh position={[0, 0, 1.05]}>
        <boxGeometry args={[160, 0.08, 0.08]} />
        <meshStandardMaterial color="#D8C8AD" roughness={0.15} metalness={0.9} />
      </mesh>
      {/* Back Polished Champagne Rail */}
      <mesh position={[0, 0, -1.05]}>
        <boxGeometry args={[160, 0.08, 0.08]} />
        <meshStandardMaterial color="#D8C8AD" roughness={0.15} metalness={0.9} />
      </mesh>
      {/* Cross-ties / Sleepers */}
      {Array.from({ length: 95 }).map((_, i) => (
        <mesh key={i} position={[-60 + i * 1.3, -0.05, 0]}>
          <boxGeometry args={[0.22, 0.06, 2.7]} />
          <meshStandardMaterial color="#EAE2D6" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// -------------------------------------------------------------
// 4. MASTER 3D TRAIN ASSEMBLY
// Moves smoothly right-to-left as scrollProgress advances from 0 to 1
// -------------------------------------------------------------
function TrainAssembly({ scrollProgress }: { scrollProgress: number }) {
  const trainGroupRef = useRef<THREE.Group>(null);

  // Spacing between train carriages
  const carSpacing = 6.2;
  const totalLength = JOURNEY_MILESTONES.length * carSpacing;

  useFrame((_, delta) => {
    if (!trainGroupRef.current) return;
    // Glides right-to-left across viewport matching scroll progress
    const targetX = 14 - scrollProgress * (totalLength + 20);
    trainGroupRef.current.position.x = THREE.MathUtils.damp(
      trainGroupRef.current.position.x,
      targetX,
      5,
      delta
    );
  });

  return (
    <group ref={trainGroupRef}>
      {/* Bullet-Train Locomotive Head */}
      <HighSpeedLocomotive xPos={0} />

      {/* 8 Connected Carriage Wagons carrying the Journey Cards */}
      {JOURNEY_MILESTONES.map((milestone, idx) => (
        <HighSpeedCarriage
          key={milestone.wagonNumber}
          milestone={milestone}
          index={idx}
          xPos={(idx + 1) * carSpacing}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
}

export default function DynamicJourneyTrainScene({
  scrollProgress,
}: TrainSceneProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 1.1, 10.2], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        shadows
      >
        {/* Warm Architectural Studio Sunlight Lighting */}
        <ambientLight intensity={1.8} color="#FFFDF8" />
        <directionalLight
          position={[10, 15, 10]}
          intensity={2.2}
          color="#FFFDF8"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-10, 8, -6]} intensity={0.7} color="#FFE0C2" />
        <pointLight position={[0, -2, 5]} intensity={1.2} color="#FFFDF8" />

        {/* 3D Railroad System */}
        <RailroadTracks />

        {/* Master 3D Train Carrying Journey Cards */}
        <TrainAssembly scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
