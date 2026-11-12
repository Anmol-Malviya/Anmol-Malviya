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
// 1. BESPOKE SHINKANSEN / HIGH-SPEED STREAMLINED LOCOMOTIVE
// Faithfully matching the user's reference image:
// - Height increased: tall majestic locomotive cabin matching carriages
// - Clear visible front windscreen & large driver side mirror window
// - Black horizontal band running along the upper side
// - Bold "ANMOL MALVIYA" branding with 3D cube logo & subtitle
// - Green aerodynamic swoosh stripe flowing into the lower chassis
// - Sage roof fairing
// - 3 illuminated ring wheels
// -------------------------------------------------------------
function FuturisticLocomotive({ xPos, wheelRotation }: { xPos: number; wheelRotation: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // High-Resolution Branding Texture: Logo + Name + Subtitle + Green Swoosh
  const brandingTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Pearl White Base (#FFFDF8)
    ctx.fillStyle = "#FFFDF8";
    ctx.fillRect(0, 0, 1000, 500);

    // 1. Minimal 3D Wireframe Cube Logo in Champagne Gold
    const cx = 500;
    const cy = 100;
    const s = 36;
    ctx.strokeStyle = "#B9A16F";
    ctx.lineWidth = 4.2;
    ctx.lineJoin = "round";

    // Top face
    ctx.beginPath();
    ctx.moveTo(cx, cy - s);
    ctx.lineTo(cx + s * 0.866, cy - s * 0.5);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx - s * 0.866, cy - s * 0.5);
    ctx.closePath();
    ctx.stroke();

    // Bottom vertical edges
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

    // 2. Brand Header: ANMOL MALVIYA
    ctx.fillStyle = "#292821";
    ctx.font = "800 56px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ANMOL MALVIYA", 500, 205);

    // 3. Subtitle: DEVELOPER • BUILDER • LEARNER
    ctx.fillStyle = "#858174";
    ctx.font = "600 22px monospace";
    ctx.letterSpacing = "4px";
    ctx.fillText("DEVELOPER • BUILDER • LEARNER", 500, 256);

    // 4. Forest Sage Green & Champagne Aerodynamic Racing Stripe
    ctx.fillStyle = "#4D7C45";
    ctx.beginPath();
    ctx.moveTo(0, 410);
    ctx.bezierCurveTo(140, 410, 220, 335, 360, 335);
    ctx.lineTo(960, 335);
    ctx.lineTo(960, 365);
    ctx.lineTo(360, 365);
    ctx.bezierCurveTo(220, 365, 140, 440, 0, 440);
    ctx.closePath();
    ctx.fill();

    // Thin Champagne accent line directly below
    ctx.fillStyle = "#D9C5A3";
    ctx.beginPath();
    ctx.moveTo(0, 442);
    ctx.bezierCurveTo(140, 442, 220, 367, 360, 367);
    ctx.lineTo(960, 367);
    ctx.lineTo(960, 376);
    ctx.lineTo(360, 376);
    ctx.bezierCurveTo(220, 376, 140, 451, 0, 451);
    ctx.closePath();
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // Custom 2D Extruded Profile for the real reference locomotive
  const trainProfileGeo = useMemo(() => {
    const shape = new THREE.Shape();
    // Start at bottom rear
    shape.moveTo(2.5, -0.6);
    // Up to top rear (tall height matching coach height)
    shape.lineTo(2.5, 1.75);
    // Along roof forward with slight curvature
    shape.lineTo(-0.7, 1.75);
    // Aerodynamic slope down across windscreen
    shape.bezierCurveTo(-1.8, 1.70, -2.5, 1.25, -2.9, 0.65);
    // Curved front bumper downward
    shape.bezierCurveTo(-3.2, 0.25, -3.2, -0.25, -2.8, -0.55);
    // Lower front chin curve
    shape.lineTo(-2.2, -0.6);
    shape.lineTo(2.5, -0.6);

    const extrudeSettings = {
      steps: 1,
      depth: 2.1,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.12,
      bevelOffset: 0,
      bevelSegments: 8,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.translate(0, 0, -1.05);
    return geo;
  }, []);

  // Custom curved windshield geometry that perfectly follows the nose contour
  const curvedWindshieldGeo = useMemo(() => {
    // 2D profile curve for the windshield following the nose slope:
    // Nose curve is: shape.lineTo(-0.7, 1.75); shape.bezierCurveTo(-1.8, 1.70, -2.5, 1.25, -2.9, 0.65);
    const curvePoints: THREE.Vector2[] = [];
    const curve = new THREE.CubicBezierCurve(
      new THREE.Vector2(-0.85, 1.765),
      new THREE.Vector2(-1.75, 1.715),
      new THREE.Vector2(-2.45, 1.27),
      new THREE.Vector2(-2.82, 0.68)
    );
    const pts = curve.getPoints(24);
    
    // Extrude a thin ribbon or build a lofted curved plate
    // Let's create an extruded shape ribbon with thickness 0.04
    const shape = new THREE.Shape();
    shape.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      shape.lineTo(pts[i].x, pts[i].y);
    }
    // slight thickness inward
    for (let i = pts.length - 1; i >= 0; i--) {
      // Normal vector inward
      shape.lineTo(pts[i].x + 0.03, pts[i].y - 0.03);
    }
    shape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: 2.14, // covers full width across front
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.translate(0, 0, -1.07);
    return geo;
  }, []);

  return (
    <group ref={groupRef} position={[xPos, 0, 0]}>
      {/* 1. Main Unified Streamlined Locomotive Body in Pearl White Satin */}
      <mesh geometry={trainProfileGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#FFFDF8"
          roughness={0.2}
          metalness={0.06}
          clearcoat={0.3}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* 2. FRONT COCKPIT CURVED WINDSCREEN (Smoothly hugs the nose aerodynamic curve) */}
      <group>
        <mesh geometry={curvedWindshieldGeo} castShadow>
          <meshPhysicalMaterial
            color="#121110"
            roughness={0.04}
            metalness={0.92}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        </mesh>
      </group>

      {/* 3. SIDE DRIVER WINDOW (Curved/angled corner window matching reference image) */}
      {/* Black Horizontal Accent Strip running along the upper side */}
      <mesh position={[0.45, 1.18, 1.18]}>
        <boxGeometry args={[3.6, 0.06, 0.02]} />
        <meshStandardMaterial color="#201E1B" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0.45, 1.18, -1.18]}>
        <boxGeometry args={[3.6, 0.06, 0.02]} />
        <meshStandardMaterial color="#201E1B" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Side Driver Cab Window (Left / Camera Facing) */}
      <group position={[-1.35, 1.05, 1.18]}>
        {/* Dark Tinted Glass Pane */}
        <mesh>
          <planeGeometry args={[1.1, 0.68]} />
          <meshPhysicalMaterial
            color="#141311"
            roughness={0.05}
            metalness={0.92}
            clearcoat={1.0}
          />
        </mesh>
        {/* Champagne Metallic Window Border Frame */}
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[1.18, 0.76]} />
          <meshStandardMaterial color="#D9C5A3" roughness={0.25} metalness={0.8} />
        </mesh>
      </group>

      {/* Side Driver Cab Window (Right / Back side) */}
      <group position={[-1.35, 1.05, -1.18]} rotation={[0, Math.PI, 0]}>
        <mesh>
          <planeGeometry args={[1.1, 0.68]} />
          <meshPhysicalMaterial
            color="#141311"
            roughness={0.05}
            metalness={0.92}
            clearcoat={1.0}
          />
        </mesh>
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[1.18, 0.76]} />
          <meshStandardMaterial color="#D9C5A3" roughness={0.25} metalness={0.8} />
        </mesh>
      </group>

      {/* 4. Roof Aerodynamic Sage Fairing & Pod (Reference top green section) */}
      <mesh position={[0.2, 1.88, 0]}>
        <boxGeometry args={[3.2, 0.18, 1.65]} />
        <meshStandardMaterial color="#4D7C45" roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[-0.4, 1.98, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.2, 24]} />
        <meshStandardMaterial color="#3C4B39" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* 5. Large Circular Front Headlight with Warm Halo Glow (Mounted on front chin) */}
      <group position={[-3.1, 0.05, 0]}>
        {/* Outer Champagne Bezel Ring */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.52, 0.52, 0.14, 32]} />
          <meshStandardMaterial color="#D9C5A3" roughness={0.2} metalness={0.85} />
        </mesh>
        {/* Glowing Amber-White Lens */}
        <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.42, 0.42, 0.06, 32]} />
          <meshBasicMaterial color="#FFF2D6" />
        </mesh>
        <pointLight position={[-0.8, 0, 0]} intensity={5.5} distance={16} color="#F5D6A4" />
      </group>

      {/* 6. Side Branding Panel (ANMOL MALVIYA + Cube + Green swoosh) */}
      {brandingTexture && (
        <>
          <mesh position={[0.65, 0.42, 1.17]}>
            <planeGeometry args={[3.4, 1.7]} />
            <meshBasicMaterial map={brandingTexture} />
          </mesh>
          <mesh position={[0.65, 0.42, -1.17]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[3.4, 1.7]} />
            <meshBasicMaterial map={brandingTexture} />
          </mesh>
        </>
      )}

      {/* 7. Lower Sleek Chassis Skirt with Dark Underside */}
      <mesh position={[0.0, -0.45, 0]} castShadow>
        <boxGeometry args={[4.9, 0.28, 2.05]} />
        <meshStandardMaterial color="#3C4B39" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* 8. THREE REALISTIC WHEEL ASSEMBLIES WITH GLOWING HALO RIM RINGS */}
      {[-1.3, 0.1, 1.5].map((wX, idx) => (
        <group key={idx}>
          {/* Left Side Wheel (Camera Facing) */}
          <group position={[wX, -0.68, 1.08]} rotation={[0, 0, wheelRotation]}>
            {/* Charcoal Rubber Tire */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.44, 0.44, 0.16, 32]} />
              <meshStandardMaterial color="#292821" roughness={0.35} metalness={0.3} />
            </mesh>
            {/* Glowing Amber-White Halo Ring Rim */}
            <mesh position={[0, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.26, 0.38, 32]} />
              <meshBasicMaterial color="#FFF5D6" side={THREE.DoubleSide} />
            </mesh>
            {/* Bronze Metallic Center Hub */}
            <mesh position={[0, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.05, 24]} />
              <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Spoke detail */}
            <mesh position={[0, 0, 0.095]}>
              <boxGeometry args={[0.6, 0.04, 0.02]} />
              <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
            </mesh>
            <pointLight position={[0, 0, 0.2]} intensity={0.7} distance={1.8} color="#FFE6AA" />
          </group>

          {/* Right Side Wheel */}
          <group position={[wX, -0.68, -1.08]} rotation={[0, 0, wheelRotation]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.44, 0.44, 0.16, 32]} />
              <meshStandardMaterial color="#292821" roughness={0.35} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0, -0.09]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.26, 0.38, 32]} />
              <meshBasicMaterial color="#FFF5D6" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0, -0.09]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.05, 24]} />
              <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Rear Coupler in Champagne Gold */}
      <mesh position={[2.55, -0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        <meshStandardMaterial color="#D9C5A3" roughness={0.25} metalness={0.85} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 2. LUXURY PASSENGER COACHES & CLEAN ACHIEVEMENT PANELS
// -------------------------------------------------------------
function LuxuryPassengerCoach({
  milestone,
  index,
  xPos,
  wheelRotation,
  scrollProgress,
}: {
  milestone: JourneyMilestone;
  index: number;
  xPos: number;
  wheelRotation: number;
  scrollProgress: number;
}) {
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

    // 1. Warm-White Translucent Surface (#FFFDF8)
    ctx.fillStyle = "#FFFDF8";
    ctx.beginPath();
    ctx.roundRect(14, 14, W - 28, H - 28, R);
    ctx.fill();

    // 2. Subtle Champagne Border (#E8DFD1 / #D9C5A3)
    ctx.strokeStyle = milestone.highlight ? "#D9C5A3" : "#E8DFD1";
    ctx.lineWidth = milestone.highlight ? 4.5 : 2.5;
    ctx.stroke();

    // 3. TOP ROW: Milestone Number + Category + Small Year Label
    const leftPad = 75;
    const topPad = 95;

    // Small Sage-Green Bullet (#4D7C45)
    ctx.fillStyle = "#4D7C45";
    ctx.beginPath();
    ctx.arc(leftPad - 20, topPad - 8, 7, 0, Math.PI * 2);
    ctx.fill();

    // Milestone Number
    ctx.fillStyle = "#292821";
    ctx.font = "700 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(milestone.wagonNumber, leftPad, topPad);

    const numW = ctx.measureText(milestone.wagonNumber).width;
    ctx.fillStyle = "#D9C5A3";
    ctx.font = "400 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(" | ", leftPad + numW + 8, topPad - 1);

    const slashW = ctx.measureText(" | ").width;
    // Category in Sage Green (#4D7C45)
    ctx.fillStyle = "#858174";
    ctx.font = "600 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(milestone.category, leftPad + numW + slashW + 8, topPad);

    // Small Year Label on Top-Right Pill (#F8F5EE)
    const yearText = milestone.period;
    ctx.font = "600 22px monospace";
    const yearW = ctx.measureText(yearText).width + 36;
    const yearX = W - leftPad - yearW + 15;
    ctx.fillStyle = "#F8F5EE";
    ctx.beginPath();
    ctx.roundRect(yearX, topPad - 32, yearW, 44, 14);
    ctx.fill();
    ctx.strokeStyle = "#E8DFD1";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = "#292821";
    ctx.fillText(yearText, yearX + 18, topPad - 3);

    // 4. RIGHT SIDE MINIMAL ABSTRACT BEIGE / SAGE ILLUSTRATION
    const thumbW = 320;
    const thumbH = 260;
    const thumbX = W - leftPad - thumbW + 10;
    const thumbY = 160;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(thumbX, thumbY, thumbW, thumbH, 24);
    ctx.clip();

    // Subtle ivory base
    const grad = ctx.createLinearGradient(thumbX, thumbY, thumbX, thumbY + thumbH);
    grad.addColorStop(0, "#FAF6EE");
    grad.addColorStop(1, "#F0E9DD");
    ctx.fillStyle = grad;
    ctx.fillRect(thumbX, thumbY, thumbW, thumbH);

    // Flowing champagne & sage ribbon artwork
    const waveGrad = ctx.createLinearGradient(thumbX, thumbY, thumbX + thumbW, thumbY + thumbH);
    waveGrad.addColorStop(0, "rgba(217, 197, 163, 0.45)");
    waveGrad.addColorStop(1, "rgba(168, 190, 145, 0.65)");
    ctx.fillStyle = waveGrad;
    ctx.beginPath();
    ctx.moveTo(thumbX, thumbY + thumbH * 0.72);
    ctx.bezierCurveTo(
      thumbX + thumbW * 0.4,
      thumbY + thumbH * 0.25,
      thumbX + thumbW * 0.65,
      thumbY + thumbH * 0.88,
      thumbX + thumbW,
      thumbY + thumbH * 0.4
    );
    ctx.lineTo(thumbX + thumbW, thumbY + thumbH);
    ctx.lineTo(thumbX, thumbY + thumbH);
    ctx.closePath();
    ctx.fill();

    // Translucent soft ivory overlay
    ctx.fillStyle = "rgba(255, 253, 248, 0.75)";
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

    ctx.strokeStyle = "#E8DFD1";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(thumbX, thumbY, thumbW, thumbH, 24);
    ctx.stroke();

    // 5. MIDDLE CONTENT (LEFT SIDE)
    // Achievement or Experience Title in Dark Charcoal Typography (#292821)
    const titleY = 215;
    ctx.fillStyle = "#292821";
    ctx.font = "800 46px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
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
      ctx.fillText(tLine2, leftPad, titleY + 54);
    }

    // Organization Name in Sage Green / Muted Bronze (#4D7C45)
    const instY = tLine2 ? titleY + 112 : titleY + 60;
    ctx.fillStyle = "#4D7C45";
    ctx.font = "600 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(`↳ ${milestone.institution}`, leftPad, instY);

    // Short Description in Secondary Charcoal (#858174)
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

    // 6. BOTTOM ROW: Category Tag & Verified Indicator
    const bottomY = H - 75;
    ctx.font = "600 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const tagText = milestone.category;
    const tagW = ctx.measureText(tagText).width + 36;
    ctx.fillStyle = "#F8F5EE";
    ctx.beginPath();
    ctx.roundRect(leftPad, bottomY - 28, tagW, 40, 12);
    ctx.fill();
    ctx.strokeStyle = "#E8DFD1";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = "#858174";
    ctx.fillText(tagText, leftPad + 18, bottomY);

    // Verified Certificate / Achievement Indicator
    const statusText = milestone.highlight ? "VERIFIED VICTORY" : "ACADEMIC RECORD";
    const statusX = leftPad + tagW + 14;
    ctx.font = "600 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const statusW = ctx.measureText(statusText).width + 36;

    ctx.fillStyle = milestone.highlight ? "#FFE0C2" : "#F4EFE6";
    ctx.beginPath();
    ctx.roundRect(statusX, bottomY - 28, statusW, 40, 12);
    ctx.fill();
    ctx.strokeStyle = milestone.highlight ? "#FFD6A6" : "#E8DFD1";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = milestone.highlight ? "#B9A16F" : "#4D7C45";
    ctx.fillText(statusText, statusX + 18, bottomY);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, [milestone, index]);

  return (
    <group position={[xPos, 0, 0]}>
      {/* 1. Lower Carriage Flatbed Skirt in Olive Green (#3C4B39) */}
      <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 0.28, 2.05]} />
        <meshPhysicalMaterial
          color="#3C4B39"
          roughness={0.4}
          metalness={0.2}
          clearcoat={0.2}
        />
      </mesh>

      {/* 2. Forest Green End-Caps on Wagon Frame (#4D7C45) */}
      <mesh position={[-2.6, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 2.4, 24]} />
        <meshStandardMaterial color="#4D7C45" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[2.6, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 2.4, 24]} />
        <meshStandardMaterial color="#4D7C45" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* 3. Mechanical Coupler to Next Car in Champagne Metal */}
      <mesh position={[2.85, -0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.55, 16]} />
        <meshStandardMaterial color="#D9C5A3" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* 4. TWO ROTATING WHEEL ASSEMBLIES: Charcoal Rubber (#292821) + Halo Rims */}
      {[-1.6, 1.6].map((wX, idx) => (
        <group key={idx}>
          {/* Front Wheel */}
          <group position={[wX, -0.68, 1.05]} rotation={[0, 0, wheelRotation]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.15, 32]} />
              <meshStandardMaterial color="#292821" roughness={0.35} metalness={0.3} />
            </mesh>
            {/* Glowing Amber-White Halo Rim */}
            <mesh position={[0, 0, 0.085]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.24, 0.36, 32]} />
              <meshBasicMaterial color="#FFF5D6" side={THREE.DoubleSide} />
            </mesh>
            {/* Bronze Metallic Hub */}
            <mesh position={[0, 0, 0.085]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.04, 24]} />
              <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Spoke detail */}
            <mesh position={[0, 0, 0.09]}>
              <boxGeometry args={[0.55, 0.035, 0.02]} />
              <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
            </mesh>
            <pointLight position={[0, 0, 0.18]} intensity={0.55} distance={1.6} color="#FFE6AA" />
          </group>

          {/* Back Wheel */}
          <group position={[wX, -0.68, -1.05]} rotation={[0, 0, wheelRotation]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.15, 32]} />
              <meshStandardMaterial color="#292821" roughness={0.35} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0, -0.085]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.24, 0.36, 32]} />
              <meshBasicMaterial color="#FFF5D6" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0, -0.085]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.04, 24]} />
              <meshStandardMaterial color="#D8C8AD" roughness={0.2} metalness={0.9} />
            </mesh>
          </group>
        </group>
      ))}

      {/* 5. 3D Showcase Card in Pearl-White (#FFFDF8) */}
      {cardTexture && (
        <group position={[0, 1.25, 0]}>
          {/* Physical 3D Card Thickness Box in Warm White */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.8, 2.7, 0.12]} />
            <meshPhysicalMaterial
              color="#FFFDF8"
              roughness={0.18}
              metalness={0.06}
              clearcoat={0.3}
            />
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
// 3. 3D RAILROAD TRACKS
// -------------------------------------------------------------
function RailroadTracks() {
  return (
    <group position={[0, -0.88, 0]}>
      {/* Front Warm Graphite Metal Rail */}
      <mesh position={[0, 0, 1.05]}>
        <boxGeometry args={[160, 0.08, 0.08]} />
        <meshStandardMaterial color="#514D43" roughness={0.25} metalness={0.85} />
      </mesh>
      {/* Back Warm Graphite Metal Rail */}
      <mesh position={[0, 0, -1.05]}>
        <boxGeometry args={[160, 0.08, 0.08]} />
        <meshStandardMaterial color="#514D43" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Thin Champagne Highlight on Top Rail Edges */}
      <mesh position={[0, 0.042, 1.05]}>
        <boxGeometry args={[160, 0.008, 0.04]} />
        <meshStandardMaterial color="#D9C5A3" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.042, -1.05]}>
        <boxGeometry args={[160, 0.008, 0.04]} />
        <meshStandardMaterial color="#D9C5A3" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Muted Taupe Sleepers / Cross-Ties (#D5CDC2) */}
      {Array.from({ length: 95 }).map((_, i) => (
        <mesh key={i} position={[-60 + i * 1.3, -0.05, 0]}>
          <boxGeometry args={[0.22, 0.06, 2.7]} />
          <meshStandardMaterial color="#D5CDC2" roughness={0.75} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

// -------------------------------------------------------------
// 4. MASTER 3D TRAIN ASSEMBLY
// Moves smoothly right-to-left as scrollProgress advances from 0 to 1
// Synchronizes wheel rotation angle with physical distance traveled
// -------------------------------------------------------------
function TrainAssembly({ scrollProgress }: { scrollProgress: number }) {
  const trainGroupRef = useRef<THREE.Group>(null);
  const currentPos = useRef(14);
  const wheelAngle = useRef(0);

  // Spacing between train carriages
  const carSpacing = 6.2;
  const totalLength = JOURNEY_MILESTONES.length * carSpacing;

  useFrame((_, delta) => {
    if (!trainGroupRef.current) return;
    const targetX = 14 - scrollProgress * (totalLength + 20);
    const prevX = currentPos.current;
    currentPos.current = THREE.MathUtils.damp(currentPos.current, targetX, 5, delta);
    trainGroupRef.current.position.x = currentPos.current;

    // Distance moved controls wheel rotation
    const distanceMoved = currentPos.current - prevX;
    wheelAngle.current += distanceMoved / 0.44;
  });

  return (
    <group ref={trainGroupRef}>
      {/* Luxury Futuristic Locomotive Head */}
      <FuturisticLocomotive xPos={0} wheelRotation={wheelAngle.current} />

      {/* 8 Connected Luxury Carriages carrying the Journey Cards */}
      {JOURNEY_MILESTONES.map((milestone, idx) => (
        <LuxuryPassengerCoach
          key={milestone.wagonNumber}
          milestone={milestone}
          index={idx}
          xPos={(idx + 1) * carSpacing}
          wheelRotation={wheelAngle.current}
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
        {/* Soft Warm Studio Illumination */}
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
        <pointLight position={[0, -2, 5]} intensity={1.1} color="#F5D6A4" />

        {/* 3D Railroad System */}
        <RailroadTracks />

        {/* Master 3D Train Carrying Journey Cards */}
        <TrainAssembly scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
