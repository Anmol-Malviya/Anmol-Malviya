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
// 2. LUXURY PASSENGER COACHES & ENCLOSED CAPSULE CARTS
// Exact Match to Reference Image (media_1794478838506_da4a2a63.jpg):
// - Full-body 3D capsule carriage in warm ivory/pearl white (#FFFDF8)
// - Smooth curved rounded corners with beveled edges (ExtrudeGeometry/roundRect)
// - Sage Green (#4D7C45 / #A8BE91) roof crown / upper racing stripe
// - Champagne Gold (#D9C5A3) accent trim outline
// - Large flush-mounted display window displaying milestone card & purple-lavender abstract graphic
// - Under-chassis lower skirting in warm ivory (#F8F5EE) with sage base
// - Mechanical connecting coupler between carriages
// - 2 sets of charcoal wheels with glowing amber-white halo rims
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
  // Custom 2D Extruded Profile for the Coach Body (Rounded Capsule)
  const coachBodyGeo = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 5.4;
    const h = 2.3;
    const r = 0.45; // Smooth rounded corners
    const x = -w / 2;
    const y = -0.45;

    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    const extrudeSettings = {
      steps: 1,
      depth: 2.1,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.12,
      bevelSegments: 6,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.translate(0, 0, -1.05);
    return geo;
  }, []);

  const cardTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1100;
    canvas.height = 560;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const W = 1100;
    const H = 560;
    const R = 32;

    // 1. Warm-White Surface (#FFFDF8)
    ctx.fillStyle = "#FFFDF8";
    ctx.beginPath();
    ctx.roundRect(10, 10, W - 20, H - 20, R);
    ctx.fill();

    // 2. Subtle Champagne Gold Border (#E8DFD1 / #D9C5A3)
    ctx.strokeStyle = milestone.highlight ? "#D9C5A3" : "#E8DFD1";
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // 3. TOP ROW: Milestone Number + Category (Matching reference image: "◎ 02 | ACHIEVEMENT")
    const leftPad = 65;
    const topPad = 80;

    // Outer circle icon (like "◎")
    ctx.strokeStyle = "#4D7C45";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(leftPad + 8, topPad - 8, 9, 0, Math.PI * 2);
    ctx.stroke();
    // Inner dot
    ctx.fillStyle = "#4D7C45";
    ctx.beginPath();
    ctx.arc(leftPad + 8, topPad - 8, 4, 0, Math.PI * 2);
    ctx.fill();

    // Wagon Number e.g. "02"
    ctx.fillStyle = "#292821";
    ctx.font = "700 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(milestone.wagonNumber, leftPad + 30, topPad);

    const numW = ctx.measureText(milestone.wagonNumber).width;
    ctx.fillStyle = "#858174";
    ctx.font = "400 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("  |  " + milestone.category.toUpperCase(), leftPad + 30 + numW, topPad - 1);

    // 4. RIGHT SIDE ABSTRACT ARTWORK (Flowing Purple/Lavender Waves - exact match to reference image!)
    const thumbW = 340;
    const thumbH = 340;
    const thumbX = W - thumbW - 55;
    const thumbY = 110;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(thumbX, thumbY, thumbW, thumbH, 24);
    ctx.clip();

    // Soft subtle purple/white background gradient
    const bgGrad = ctx.createLinearGradient(thumbX, thumbY, thumbX + thumbW, thumbY + thumbH);
    bgGrad.addColorStop(0, "#FAF8FC");
    bgGrad.addColorStop(1, "#F3EFF8");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(thumbX, thumbY, thumbW, thumbH);

    // Dynamic wave curves in purple / lavender hues (#9B72CF, #C8B6E2, #7B68EE)
    // 1st Layer Wave
    const wave1 = ctx.createLinearGradient(thumbX, thumbY + 150, thumbX + thumbW, thumbY + 340);
    wave1.addColorStop(0, "rgba(155, 114, 207, 0.45)");
    wave1.addColorStop(1, "rgba(200, 182, 226, 0.2)");
    ctx.fillStyle = wave1;
    ctx.beginPath();
    ctx.moveTo(thumbX - 20, thumbY + 280);
    ctx.bezierCurveTo(
      thumbX + 90,
      thumbY + 140,
      thumbX + 180,
      thumbY + 310,
      thumbX + thumbW + 20,
      thumbY + 180
    );
    ctx.lineTo(thumbX + thumbW + 20, thumbY + thumbH + 20);
    ctx.lineTo(thumbX - 20, thumbY + thumbH + 20);
    ctx.closePath();
    ctx.fill();

    // 2nd Layer Ribbon
    const wave2 = ctx.createLinearGradient(thumbX + 60, thumbY + 80, thumbX + thumbW, thumbY + 260);
    wave2.addColorStop(0, "rgba(123, 104, 238, 0.6)");
    wave2.addColorStop(1, "rgba(186, 164, 235, 0.35)");
    ctx.fillStyle = wave2;
    ctx.beginPath();
    ctx.moveTo(thumbX - 20, thumbY + 230);
    ctx.bezierCurveTo(
      thumbX + 110,
      thumbY + 90,
      thumbX + 220,
      thumbY + 260,
      thumbX + thumbW + 20,
      thumbY + 130
    );
    ctx.lineTo(thumbX + thumbW + 20, thumbY + 250);
    ctx.bezierCurveTo(
      thumbX + 220,
      thumbY + 330,
      thumbX + 110,
      thumbY + 160,
      thumbX - 20,
      thumbY + 290
    );
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // 5. MIDDLE TEXT (LEFT SIDE)
    // Title in Bold Charcoal
    const titleY = 195;
    ctx.fillStyle = "#292821";
    ctx.font = "800 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";

    const maxTitleW = thumbX - leftPad - 35;
    const words = milestone.role.split(" ");
    let l1 = "";
    let l2 = "";
    for (const w of words) {
      if ((l1 + " " + w).length < 24) {
        l1 += (l1 ? " " : "") + w;
      } else {
        l2 += (l2 ? " " : "") + w;
      }
    }
    ctx.fillText(l1, leftPad, titleY);
    if (l2) {
      ctx.fillText(l2, leftPad, titleY + 52);
    }

    // Institution / Organization
    const instY = l2 ? titleY + 110 : titleY + 60;
    ctx.fillStyle = "#4D7C45";
    ctx.font = "600 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(milestone.institution, leftPad, instY);

    // Description text
    ctx.fillStyle = "#858174";
    ctx.font = "400 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const descY = instY + 44;
    const descWords = milestone.details.split(" ");
    let d1 = "";
    let d2 = "";
    for (const dw of descWords) {
      if ((d1 + " " + dw).length < 34) {
        d1 += (d1 ? " " : "") + dw;
      } else {
        d2 += (d2 ? " " : "") + dw;
      }
    }
    ctx.fillText(d1, leftPad, descY);
    if (d2) {
      ctx.fillText(d2, leftPad, descY + 32);
    }

    // 6. BOTTOM ROW: Period & Category Badge
    const bottomY = H - 60;
    ctx.fillStyle = "#858174";
    ctx.font = "600 20px monospace";
    ctx.fillText(milestone.period, leftPad, bottomY);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, [milestone]);

  return (
    <group position={[xPos, 0, 0]}>
      {/* 1. Main Unified Rounded Carriage Shell in Pearl White Satin (#FFFDF8) */}
      <mesh geometry={coachBodyGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#FFFDF8"
          roughness={0.2}
          metalness={0.06}
          clearcoat={0.3}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* 2. Roof Aerodynamic Accent Fairing in Forest Sage (#4D7C45) */}
      <mesh position={[0, 1.9, 0]}>
        <boxGeometry args={[4.4, 0.12, 1.65]} />
        <meshStandardMaterial color="#4D7C45" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* 3. Lower Chassis Trim Strip in Sage Green & Champagne */}
      <mesh position={[0, -0.42, 1.18]}>
        <boxGeometry args={[4.8, 0.06, 0.02]} />
        <meshStandardMaterial color="#4D7C45" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, -0.42, -1.18]}>
        <boxGeometry args={[4.8, 0.06, 0.02]} />
        <meshStandardMaterial color="#4D7C45" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* 4. Display Window Inset Frame in Champagne Gold (#D9C5A3) */}
      <mesh position={[0, 0.72, 1.18]}>
        <planeGeometry args={[4.86, 2.48]} />
        <meshStandardMaterial color="#D9C5A3" roughness={0.25} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.72, -1.18]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[4.86, 2.48]} />
        <meshStandardMaterial color="#D9C5A3" roughness={0.25} metalness={0.8} />
      </mesh>

      {/* 5. Clean Milestone Card Texture on Side Glass Window */}
      {cardTexture && (
        <>
          {/* Front Face (Camera Facing) */}
          <mesh position={[0, 0.72, 1.185]}>
            <planeGeometry args={[4.76, 2.38]} />
            <meshBasicMaterial map={cardTexture} />
          </mesh>
          {/* Back Face */}
          <mesh position={[0, 0.72, -1.185]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[4.76, 2.38]} />
            <meshBasicMaterial map={cardTexture} />
          </mesh>
        </>
      )}

      {/* 6. Mechanical Coupler to Next Wagon in Champagne Metal */}
      <mesh position={[2.85, -0.38, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.55, 16]} />
        <meshStandardMaterial color="#D9C5A3" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* 7. TWO ROTATING WHEEL ASSEMBLIES: Charcoal Rubber (#292821) + Halo Rims */}
      {[-1.65, 1.65].map((wX, idx) => (
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
