"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { JOURNEY_MILESTONES, JourneyMilestone } from "./journeyData";

interface TrainSceneProps {
  scrollProgress: number; // 0 to 1
  onHoverMilestone?: (index: number | null) => void;
}

// 3D LOCOMOTIVE HEAD — Warm Ivory Luxury Architectural Train
function Locomotive({ xPos }: { xPos: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // High-res Locomotive front nameplate canvas
  const logoTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Warm ivory plate background with soft beige border
    ctx.fillStyle = "#FFFDF8";
    ctx.beginPath();
    ctx.roundRect(10, 10, 580, 300, 24);
    ctx.fill();

    ctx.strokeStyle = "#D8C8AD";
    ctx.lineWidth = 5;
    ctx.stroke();

    // Subtle gold trim interior line
    ctx.strokeStyle = "#EAE2D6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(24, 24, 552, 272, 16);
    ctx.stroke();

    // Locomotive Branding Typography
    ctx.fillStyle = "#292821";
    ctx.font = "bold 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ANMOL MALVIYA", 300, 130);

    ctx.fillStyle = "#8FBF7A";
    ctx.font = "600 28px monospace";
    ctx.fillText("CAREER ODYSSEY • 2022–2026+", 300, 195);

    ctx.fillStyle = "#858174";
    ctx.font = "20px monospace";
    ctx.fillText("LOCOMOTIVE NO. 01 • PROTOTYPE", 300, 245);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }, []);

  return (
    <group ref={groupRef} position={[xPos, 0, 0]}>
      {/* Main Streamlined Locomotive Body in Warm Ceramic Ivory */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 2.2, 2.3]} />
        <meshStandardMaterial
          color="#FFFDF8"
          roughness={0.25}
          metalness={0.15}
        />
      </mesh>

      {/* Aerodynamic Sleek Nose Cone (Front of train) */}
      <mesh position={[-2.4, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.95, 1.15, 0.9, 32]} />
        <meshStandardMaterial color="#F4EFE6" roughness={0.28} metalness={0.2} />
      </mesh>

      {/* Front Glowing Champagne Xenon Headlight */}
      <mesh position={[-2.88, 0.15, 0]}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color="#FFE0C2" />
      </mesh>
      <pointLight position={[-3.4, 0.25, 0]} intensity={4.5} distance={12} color="#FFE0C2" />

      {/* Roof Polished Champagne Gold Accent Trim */}
      <mesh position={[0, 1.58, 0]}>
        <boxGeometry args={[4.2, 0.14, 2.0]} />
        <meshStandardMaterial color="#D8C8AD" roughness={0.15} metalness={0.8} />
      </mesh>

      {/* Streamlined Panoramic Glass Windows with Champagne Frame */}
      <mesh position={[-0.3, 0.85, 1.16]}>
        <planeGeometry args={[3.0, 0.68]} />
        <meshStandardMaterial color="#292821" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[-0.3, 0.85, -1.16]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3.0, 0.68]} />
        <meshStandardMaterial color="#292821" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Locomotive Nameplate Emblem */}
      {logoTexture && (
        <mesh position={[0.2, 0.05, 1.165]}>
          <planeGeometry args={[2.4, 1.25]} />
          <meshBasicMaterial map={logoTexture} />
        </mesh>
      )}

      {/* Lower Chassis Skirt with Champagne Accent Ribbon */}
      <mesh position={[0, -0.42, 0]} castShadow>
        <boxGeometry args={[4.6, 0.35, 2.2]} />
        <meshStandardMaterial color="#EAE2D6" roughness={0.35} metalness={0.3} />
      </mesh>

      {/* Undercarriage Metallic Bogie & Elegant Dark Slate Wheels */}
      {[-1.4, -0.6, 0.6, 1.4].map((wheelX, idx) => (
        <group key={idx}>
          {/* Left Wheels */}
          <mesh position={[wheelX, -0.7, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.16, 24]} />
            <meshStandardMaterial color="#4A463E" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Champagne Center Wheel Rim */}
          <mesh position={[wheelX, -0.7, 1.19]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.04, 24]} />
            <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
          </mesh>

          {/* Right Wheels */}
          <mesh position={[wheelX, -0.7, -1.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.16, 24]} />
            <meshStandardMaterial color="#4A463E" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Champagne Center Wheel Rim */}
          <mesh position={[wheelX, -0.7, -1.19]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.04, 24]} />
            <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Rear Coupler in Champagne Metal */}
      <mesh position={[2.35, -0.42, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial color="#D8C8AD" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

// 3D CARRIAGE WAGON CARRYING THE JOURNEY CARD
function CarriageWagon({
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
  // High-Resolution Card Face Canvas — Matching the Minimal Warm-Ivory Reference
  const cardTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1100;
    canvas.height = 680;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const W = 1100;
    const H = 680;
    const R = 44;

    // 1. Soft Ambient Drop Shadow under card surface
    ctx.shadowColor = "rgba(180, 160, 140, 0.25)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 12;

    // 2. Warm Ivory Surface (#FFFDF8)
    ctx.fillStyle = "#FFFDF8";
    ctx.beginPath();
    ctx.roundRect(16, 16, W - 32, H - 32, R);
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // 3. Thin Warm Beige Border (#EAE2D6) or Highlight Champagne Accent
    ctx.strokeStyle = milestone.highlight ? "#D8C8AD" : "#EAE2D6";
    ctx.lineWidth = milestone.highlight ? 4.5 : 3.0;
    ctx.beginPath();
    ctx.roundRect(16, 16, W - 32, H - 32, R);
    ctx.stroke();

    // 4. TOP ROW: Project Number / Wagon Number & Category
    const leftPad = 65;
    const topPad = 80;

    ctx.fillStyle = "#292821";
    ctx.font = "600 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(milestone.wagonNumber, leftPad, topPad);

    const numWidth = ctx.measureText(milestone.wagonNumber).width;
    ctx.fillStyle = "#B3ACA0";
    ctx.font = "400 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(" / ", leftPad + numWidth + 6, topPad - 1);

    const slashWidth = ctx.measureText(" / ").width;
    ctx.fillStyle = "#6E6A60";
    ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(milestone.category, leftPad + numWidth + slashWidth + 6, topPad);

    // Northeast Diagonal Arrow at Top-Right (↗)
    const arrowX = W - 80;
    const arrowY = topPad - 8;
    ctx.strokeStyle = "#292821";
    ctx.lineWidth = 3.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(arrowX - 18, arrowY + 18);
    ctx.lineTo(arrowX, arrowY);
    ctx.moveTo(arrowX - 12, arrowY);
    ctx.lineTo(arrowX, arrowY);
    ctx.lineTo(arrowX, arrowY + 12);
    ctx.stroke();

    // 5. RIGHT SIDE ABSTRACT ARTWORK THUMBNAIL (Harmonized with reference)
    const thumbW = 280;
    const thumbH = 200;
    const thumbX = W - leftPad - thumbW;
    const thumbY = 145;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(thumbX, thumbY, thumbW, thumbH, 20);
    ctx.clip();

    // Thumbnail background gradient
    const thumbGrad = ctx.createLinearGradient(thumbX, thumbY, thumbX, thumbY + thumbH);
    if (index === 0) {
      thumbGrad.addColorStop(0, "#F1EBF9");
      thumbGrad.addColorStop(1, "#E4D5F2");
    } else if (index === 1) {
      thumbGrad.addColorStop(0, "#FBF6EE");
      thumbGrad.addColorStop(1, "#EFE2CD");
    } else if (index === 2) {
      thumbGrad.addColorStop(0, "#EDF4EB");
      thumbGrad.addColorStop(1, "#DDE8D9");
    } else if (index === 3) {
      thumbGrad.addColorStop(0, "#F5EFE6");
      thumbGrad.addColorStop(1, "#E5DCD0");
    } else {
      thumbGrad.addColorStop(0, "#FAF5EE");
      thumbGrad.addColorStop(1, "#EFE4D2");
    }
    ctx.fillStyle = thumbGrad;
    ctx.fillRect(thumbX, thumbY, thumbW, thumbH);

    // Decorative smooth abstract ribbon inside thumbnail
    ctx.fillStyle = index % 2 === 0 ? "rgba(186, 155, 222, 0.55)" : "rgba(216, 178, 133, 0.55)";
    ctx.beginPath();
    ctx.moveTo(thumbX, thumbY + thumbH * 0.7);
    ctx.bezierCurveTo(
      thumbX + thumbW * 0.4,
      thumbY + thumbH * 0.25,
      thumbX + thumbW * 0.65,
      thumbY + thumbH * 0.85,
      thumbX + thumbW,
      thumbY + thumbH * 0.45
    );
    ctx.lineTo(thumbX + thumbW, thumbY + thumbH);
    ctx.lineTo(thumbX, thumbY + thumbH);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // Thumbnail subtle border
    ctx.strokeStyle = "rgba(234, 226, 214, 0.9)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(thumbX, thumbY, thumbW, thumbH, 20);
    ctx.stroke();

    // 6. MAIN CONTENT (LEFT SIDE)
    // Milestone Role / Title in Bold Typography
    const titleY = 185;
    ctx.fillStyle = "#292821";
    ctx.font = "700 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";

    // Clean word wrapping
    const maxWidth = thumbX - leftPad - 35;
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
      ctx.fillText(tLine2, leftPad, titleY + 50);
    }

    // Institution in soft green / charcoal
    const instY = tLine2 ? titleY + 105 : titleY + 58;
    ctx.fillStyle = "#8FBF7A";
    ctx.font = "600 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(`↳ ${milestone.institution}`, leftPad, instY);

    // Details Paragraph in Secondary Text (#858174)
    ctx.fillStyle = "#858174";
    ctx.font = "400 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const descY = instY + 55;
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

    // 7. BOTTOM ROW: SMALL TECHNOLOGY / PERIOD PILLS (#F4EFE6)
    const bottomY = H - 80;
    const tagPaddingX = 24;
    const tagHeight = 44;
    const tagRadius = 14;

    // Period Badge Pill
    ctx.font = "600 22px monospace";
    const periodWidth = ctx.measureText(milestone.period).width + tagPaddingX * 2;
    ctx.fillStyle = "#F4EFE6";
    ctx.beginPath();
    ctx.roundRect(leftPad, bottomY - 30, periodWidth, tagHeight, tagRadius);
    ctx.fill();
    ctx.strokeStyle = "#E8E0D2";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = "#292821";
    ctx.fillText(milestone.period, leftPad + tagPaddingX, bottomY);

    // Status Pill
    const statusText = milestone.highlight ? "FEATURED VICTORY" : "ACADEMIC MILESTONE";
    const statusX = leftPad + periodWidth + 14;
    ctx.font = "500 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const statusWidth = ctx.measureText(statusText).width + tagPaddingX * 2;

    ctx.fillStyle = milestone.highlight ? "#FFE0C2" : "#F4EFE6";
    ctx.beginPath();
    ctx.roundRect(statusX, bottomY - 30, statusWidth, tagHeight, tagRadius);
    ctx.fill();
    ctx.strokeStyle = milestone.highlight ? "#FFD6A6" : "#E8E0D2";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = milestone.highlight ? "#D9A46F" : "#858174";
    ctx.fillText(statusText, statusX + tagPaddingX, bottomY);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, [milestone, index]);

  return (
    <group position={[xPos, 0, 0]}>
      {/* Lower Flatbed Carriage Chassis in Warm Beige with Champagne Accents */}
      <mesh position={[0, -0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.32, 2.2]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Mechanical Coupler connecting to next car in Champagne Gold */}
      <mesh position={[2.65, -0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.6, 12]} />
        <meshStandardMaterial color="#D8C8AD" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Undercarriage Bogie Wheels with Golden Rims */}
      {[-1.6, -0.9, 0.9, 1.6].map((wX, idx) => (
        <group key={idx}>
          {/* Wheel Disc */}
          <mesh position={[wX, -0.72, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.36, 0.36, 0.14, 24]} />
            <meshStandardMaterial color="#4A463E" roughness={0.35} metalness={0.7} />
          </mesh>
          <mesh position={[wX, -0.72, 1.13]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.03, 24]} />
            <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
          </mesh>

          <mesh position={[wX, -0.72, -1.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.36, 0.36, 0.14, 24]} />
            <meshStandardMaterial color="#4A463E" roughness={0.35} metalness={0.7} />
          </mesh>
          <mesh position={[wX, -0.72, -1.13]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.03, 24]} />
            <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* 3D Showcase Card Mounted On Top of Carriage (Dimensions: 4.4 x 2.72) */}
      {cardTexture && (
        <group position={[0, 1.35, 0]}>
          {/* Card Physical Depth Box in Warm White */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.4, 2.72, 0.12]} />
            <meshStandardMaterial color="#FFFDF8" roughness={0.25} metalness={0.1} />
          </mesh>

          {/* Front Face Texture */}
          <mesh position={[0, 0, 0.065]}>
            <planeGeometry args={[4.35, 2.68]} />
            <meshBasicMaterial map={cardTexture} />
          </mesh>

          {/* Back Face Texture */}
          <mesh position={[0, 0, -0.065]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[4.35, 2.68]} />
            <meshBasicMaterial map={cardTexture} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// 3D RAILROAD TRACKS (Continuous metallic champagne rails with warm ties)
function RailroadTracks() {
  return (
    <group position={[0, -0.88, 0]}>
      {/* Front Polished Champagne Rail */}
      <mesh position={[0, 0, 1.05]}>
        <boxGeometry args={[140, 0.08, 0.08]} />
        <meshStandardMaterial color="#D8C8AD" roughness={0.15} metalness={0.9} />
      </mesh>
      {/* Back Polished Champagne Rail */}
      <mesh position={[0, 0, -1.05]}>
        <boxGeometry args={[140, 0.08, 0.08]} />
        <meshStandardMaterial color="#D8C8AD" roughness={0.15} metalness={0.9} />
      </mesh>
      {/* Sleepers / Cross-Ties in Warm Earth Tone */}
      {Array.from({ length: 85 }).map((_, i) => (
        <mesh key={i} position={[-55 + i * 1.3, -0.05, 0]}>
          <boxGeometry args={[0.22, 0.06, 2.7]} />
          <meshStandardMaterial color="#EAE2D6" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// Master Train Assembly
function TrainAssembly({ scrollProgress }: { scrollProgress: number }) {
  const trainGroupRef = useRef<THREE.Group>(null);

  // Spacing between train cars
  const carSpacing = 5.8;
  const totalLength = JOURNEY_MILESTONES.length * carSpacing;

  useFrame((_, delta) => {
    if (!trainGroupRef.current) return;
    // Moves right-to-left across viewport as scroll advances from 0 to 1
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
      {/* Locomotive Engine at Front */}
      <Locomotive xPos={0} />

      {/* 8 Connected Carriages carrying the journey cards */}
      {JOURNEY_MILESTONES.map((milestone, idx) => (
        <CarriageWagon
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
        camera={{ position: [0, 1.2, 10.5], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        shadows
      >
        {/* Warm Architectural Studio Lighting */}
        <ambientLight intensity={1.8} color="#FFFDF8" />
        <directionalLight
          position={[10, 14, 10]}
          intensity={2.0}
          color="#FFFDF8"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-10, 8, -6]} intensity={0.8} color="#FFE0C2" />
        <pointLight position={[0, -2, 5]} intensity={1.2} color="#FFFDF8" />

        {/* 3D Railroad System */}
        <RailroadTracks />

        {/* Master 3D Train Carrying Journey Cards */}
        <TrainAssembly scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
