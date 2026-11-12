"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ProjectItem } from "./projectsData";

interface ProjectCard3DProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  scrollProgress: number; // 0 to 1
  isHovered: boolean;
  onHover: (index: number | null) => void;
  onSelect: (project: ProjectItem) => void;
}

// Helper: draw bespoke minimal abstract thumbnails matching reference design
function drawAbstractThumbnail(
  ctx: CanvasRenderingContext2D,
  projectId: string,
  x: number,
  y: number,
  w: number,
  h: number,
  isHovered: boolean
) {
  ctx.save();
  // Clip to rounded container with subtle border
  const r = 18;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.clip();

  // Background base for thumbnail container
  switch (projectId) {
    case "ai-interviewer": {
      // Soft lavender waveform (Matching reference image card 01)
      const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
      bgGrad.addColorStop(0, "#F1EBF9");
      bgGrad.addColorStop(1, "#E4D5F2");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(x, y, w, h);

      // Smooth flowing wave layers
      const waveGrad1 = ctx.createLinearGradient(x, y + h * 0.3, x + w, y + h);
      waveGrad1.addColorStop(0, "rgba(186, 155, 222, 0.45)");
      waveGrad1.addColorStop(1, "rgba(155, 115, 204, 0.75)");
      ctx.fillStyle = waveGrad1;
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.7);
      ctx.bezierCurveTo(x + w * 0.35, y + h * 0.3, x + w * 0.65, y + h * 0.85, x + w, y + h * 0.45);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.closePath();
      ctx.fill();

      // Second soft highlight wave
      const waveGrad2 = ctx.createLinearGradient(x, y, x + w, y + h);
      waveGrad2.addColorStop(0, "rgba(255, 255, 255, 0.65)");
      waveGrad2.addColorStop(1, "rgba(202, 178, 233, 0.4)");
      ctx.fillStyle = waveGrad2;
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.5);
      ctx.bezierCurveTo(x + w * 0.4, y + h * 0.85, x + w * 0.7, y + h * 0.25, x + w, y + h * 0.6);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "hotel-erp": {
      // Warm beige architectural layers (Matching reference image card 02)
      const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
      bgGrad.addColorStop(0, "#FBF6EE");
      bgGrad.addColorStop(1, "#EFE2CD");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(x, y, w, h);

      // Architectural flowing ribbons
      const ribbonGrad = ctx.createLinearGradient(x, y, x + w, y + h);
      ribbonGrad.addColorStop(0, "rgba(216, 178, 133, 0.4)");
      ribbonGrad.addColorStop(1, "rgba(189, 142, 92, 0.7)");
      ctx.fillStyle = ribbonGrad;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.15, y);
      ctx.bezierCurveTo(x + w * 0.4, y + h * 0.5, x + w * 0.1, y + h * 0.85, x + w * 0.85, y + h);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x + w, y);
      ctx.closePath();
      ctx.fill();

      // Translucent architectural sweep
      ctx.fillStyle = "rgba(255, 248, 238, 0.75)";
      ctx.beginPath();
      ctx.moveTo(x + w * 0.4, y);
      ctx.bezierCurveTo(x + w * 0.6, y + h * 0.6, x + w * 0.35, y + h, x + w, y + h * 0.65);
      ctx.lineTo(x + w, y);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "mailtrace-ai": {
      // Subtle green forensic signal (Matching reference image card 03)
      const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
      bgGrad.addColorStop(0, "#EDF4EB");
      bgGrad.addColorStop(1, "#DDE8D9");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(x, y, w, h);

      // Soft green curved contour layers
      const greenGrad = ctx.createLinearGradient(x, y + h * 0.2, x + w, y + h);
      greenGrad.addColorStop(0, "rgba(169, 201, 155, 0.5)");
      greenGrad.addColorStop(1, "rgba(132, 172, 116, 0.8)");
      ctx.fillStyle = greenGrad;
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.75);
      ctx.bezierCurveTo(x + w * 0.3, y + h * 0.35, x + w * 0.6, y + h * 0.7, x + w, y + h * 0.4);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.closePath();
      ctx.fill();

      // Subtle light trace line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.68);
      ctx.bezierCurveTo(x + w * 0.3, y + h * 0.28, x + w * 0.6, y + h * 0.63, x + w, y + h * 0.33);
      ctx.stroke();
      break;
    }

    case "dev-marketplace": {
      // Layered geometric tiles in soft slate/champagne
      const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
      bgGrad.addColorStop(0, "#F5EFE6");
      bgGrad.addColorStop(1, "#E5DCD0");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(x, y, w, h);

      ctx.fillStyle = "rgba(195, 178, 157, 0.45)";
      ctx.beginPath();
      ctx.roundRect(x + w * 0.2, y + h * 0.2, w * 0.6, h * 0.55, 12);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.beginPath();
      ctx.roundRect(x + w * 0.35, y + h * 0.35, w * 0.55, h * 0.55, 12);
      ctx.fill();

      ctx.strokeStyle = "rgba(180, 160, 138, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
      break;
    }

    case "vyorai": {
      // Soft peach and champagne fabric-inspired draped waves
      const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
      bgGrad.addColorStop(0, "#FCF2EB");
      bgGrad.addColorStop(1, "#F3DECE");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(x, y, w, h);

      const peachGrad = ctx.createLinearGradient(x, y, x + w, y + h);
      peachGrad.addColorStop(0, "rgba(240, 185, 160, 0.5)");
      peachGrad.addColorStop(1, "rgba(218, 148, 120, 0.75)");
      ctx.fillStyle = peachGrad;
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.4);
      ctx.bezierCurveTo(x + w * 0.4, y + h * 0.1, x + w * 0.5, y + h * 0.9, x + w, y + h * 0.5);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.6);
      ctx.bezierCurveTo(x + w * 0.35, y + h * 0.85, x + w * 0.75, y + h * 0.3, x + w, y + h * 0.7);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "pen-llm": {
      // Minimal terminal / subtle green matrix wave
      const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
      bgGrad.addColorStop(0, "#F2F7F2");
      bgGrad.addColorStop(1, "#DFE9E0");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(x, y, w, h);

      ctx.strokeStyle = "rgba(132, 176, 140, 0.6)";
      ctx.lineWidth = 3;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const offsetY = y + 25 + i * 22;
        ctx.moveTo(x + 15, offsetY);
        ctx.bezierCurveTo(x + w * 0.4, offsetY + 20, x + w * 0.65, offsetY - 18, x + w - 15, offsetY + 10);
        ctx.stroke();
      }
      break;
    }

    case "adhritverse": {
      // Elegant spatial geometric forms
      const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
      bgGrad.addColorStop(0, "#F3F5F9");
      bgGrad.addColorStop(1, "#DEE3ED");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(x, y, w, h);

      ctx.strokeStyle = "rgba(164, 178, 204, 0.55)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(x + w * 0.7, y + h * 0.55, 42, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x + w * 0.7, y + h * 0.55, 24, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.beginPath();
      ctx.arc(x + w * 0.45, y + h * 0.4, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(180, 192, 212, 0.6)";
      ctx.stroke();
      break;
    }

    default: {
      // Portfolio / Creative: Abstract 3D wireframe / champagne rings
      const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
      bgGrad.addColorStop(0, "#FAF5EE");
      bgGrad.addColorStop(1, "#EFE4D2");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(x, y, w, h);

      ctx.strokeStyle = "rgba(205, 180, 145, 0.65)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(x + w * 0.5, y + h * 0.5, w * 0.38, h * 0.28, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.beginPath();
      ctx.arc(x + w * 0.5, y + h * 0.5, 20, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.restore();

  // Fine container border
  ctx.strokeStyle = "rgba(234, 226, 214, 0.85)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.stroke();
}

export default function ProjectCard3D({
  project,
  index,
  totalCards,
  scrollProgress,
  isHovered,
  onHover,
  onSelect,
}: ProjectCard3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Exact orbital radius around central pillar
  const radiusX = 4.3;
  const radiusZ = 3.2;
  const baseAngle = (index / totalCards) * Math.PI * 2;
  // Natural vertical distribution around pillar
  const heightOffsets = [0.0, 0.32, 0.55, 0.15, 0.42, -0.08, 0.22, 0.48];
  const naturalHeight = heightOffsets[index % heightOffsets.length];

  // High-Resolution 2D Canvas texture for minimal warm-ivory card face
  // 1000 x 500 resolution ensures ultra-crisp Apple-grade text and graphics
  const cardTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const W = 1000;
    const H = 500;
    const R = 44; // 24px proportional radius on 1000px width

    // 1. Soft Ambient Drop Shadow under card surface
    ctx.shadowColor = isHovered ? "rgba(180, 160, 140, 0.35)" : "rgba(200, 185, 165, 0.22)";
    ctx.shadowBlur = isHovered ? 40 : 25;
    ctx.shadowOffsetY = isHovered ? 14 : 10;

    // 2. Warm Ivory Matte Ceramic Surface (#FFFDF8)
    ctx.fillStyle = isHovered ? "#FFFFFF" : "#FFFDF8";
    ctx.beginPath();
    ctx.roundRect(16, 16, W - 32, H - 32, R);
    ctx.fill();

    // Reset shadow for internal content
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // 3. Thin warm beige border (#EAE2D6)
    ctx.strokeStyle = isHovered ? "#D8C8AD" : "#EAE2D6";
    ctx.lineWidth = isHovered ? 3.5 : 2.5;
    ctx.beginPath();
    ctx.roundRect(16, 16, W - 32, H - 32, R);
    ctx.stroke();

    // 4. TOP ROW
    // Project Number (01, 02...) & Category
    const leftPad = 62;
    const topPad = 74;

    // Project Number in medium charcoal
    ctx.fillStyle = "#292821";
    ctx.font = "600 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(project.num, leftPad, topPad);

    // Subtle slash divider
    const numWidth = ctx.measureText(project.num).width;
    ctx.fillStyle = "#B3ACA0";
    ctx.font = "400 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(" / ", leftPad + numWidth + 6, topPad - 1);

    // Category in clean secondary typography
    const slashWidth = ctx.measureText(" / ").width;
    ctx.fillStyle = "#6E6A60";
    ctx.font = "500 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(project.category, leftPad + numWidth + slashWidth + 6, topPad);

    // Northeast minimal diagonal arrow (↗) at top-right
    const arrowX = W - 78;
    const arrowY = topPad - 8;
    const arrowShift = isHovered ? 4 : 0;

    ctx.strokeStyle = "#292821";
    ctx.lineWidth = 3.0;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(arrowX - 18 + arrowShift, arrowY + 18 - arrowShift);
    ctx.lineTo(arrowX + arrowShift, arrowY - arrowShift);
    ctx.moveTo(arrowX - 12 + arrowShift, arrowY - arrowShift);
    ctx.lineTo(arrowX + arrowShift, arrowY - arrowShift);
    ctx.lineTo(arrowX + arrowShift, arrowY + 12 - arrowShift);
    ctx.stroke();

    // 5. RIGHT SIDE ABSTRACT THUMBNAIL
    // Dimensions: w=260, h=175 (scaled proportionally to 1000px canvas)
    const thumbW = 260;
    const thumbH = 175;
    const thumbX = W - leftPad - thumbW;
    const thumbY = 142;
    drawAbstractThumbnail(ctx, project.id, thumbX, thumbY, thumbW, thumbH, isHovered);

    // 6. MAIN CONTENT (LEFT SIDE)
    // Project Title in bold, clean typography (#292821)
    const titleY = 175;
    ctx.fillStyle = "#292821";
    ctx.font = "700 46px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(project.title, leftPad, titleY);

    // Short Description, maximum two lines (#858174)
    const textMaxWidth = thumbX - leftPad - 40;
    ctx.fillStyle = "#858174";
    ctx.font = "400 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    // Split short description or tagline gracefully into 2 lines
    const descText =
      project.id === "ai-interviewer"
        ? "Real-time technical interview simulation\nand mastery analytics."
        : project.id === "hotel-erp"
        ? "High-performance hospitality\nbooking and operations platform."
        : project.id === "mailtrace-ai"
        ? "AI-powered email threat\ndetection and forensic intelligence."
        : project.id === "dev-marketplace"
        ? "Curated digital hub for bespoke\nUI artifacts and WebGL modules."
        : project.id === "vyorai"
        ? "Realistic AI garment drape simulation\nand virtual fitting experience."
        : project.id === "pen-llm"
        ? "Air-gapped local LLM concept\nrunning from portable USB storage."
        : project.id === "adhritverse"
        ? "High-craft web platforms and\nspatial agency client solutions."
        : "Interactive 3D spatial showcase\nwith synchronized physical lighting.";

    const lines = descText.split("\n");
    const descStartY = titleY + 48;
    const lineSpacing = 36;
    lines.forEach((line, i) => {
      ctx.fillText(line, leftPad, descStartY + i * lineSpacing, textMaxWidth);
    });

    // 7. BOTTOM ROW: 2-3 SMALL TECHNOLOGY TAGS (#F4EFE6)
    // No large buttons, no status badges
    const tagsStartY = H - 85;
    const tagPaddingX = 22;
    const tagHeight = 44;
    const tagRadius = 14;
    let currentTagX = leftPad;

    const displayTech = project.tech.slice(0, 3);
    ctx.font = "500 21px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    displayTech.forEach((tech) => {
      const tagTextWidth = ctx.measureText(tech).width;
      const pillWidth = tagTextWidth + tagPaddingX * 2;

      // Pill background: #F4EFE6
      ctx.fillStyle = "#F4EFE6";
      ctx.beginPath();
      ctx.roundRect(currentTagX, tagsStartY - 30, pillWidth, tagHeight, tagRadius);
      ctx.fill();

      // Subtle tag border
      ctx.strokeStyle = "#E8E0D2";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Tag text: #4A463E
      ctx.fillStyle = "#4A463E";
      ctx.textAlign = "left";
      ctx.fillText(tech, currentTagX + tagPaddingX, tagsStartY);

      currentTagX += pillWidth + 14;
    });

    // Generate high quality canvas texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, [project, isHovered]);

  // Initial constant position - orbital plane, NO RISE ANIMATION!
  const initialAngle = baseAngle;
  const initialPos = useMemo(() => {
    return new THREE.Vector3(
      Math.cos(initialAngle) * radiusX,
      naturalHeight,
      Math.sin(initialAngle) * radiusZ
    );
  }, [initialAngle, naturalHeight, radiusX, radiusZ]);

  const currentPos = useRef(new THREE.Vector3().copy(initialPos));
  const currentScale = useRef(0.75);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let targetX = 0;
    let targetY = naturalHeight;
    let targetZ = 0;
    let targetScale = 0.72;

    if (scrollProgress < 0.28) {
      // Stage 1 & 2: Balanced orbit around central pillar
      const t = scrollProgress / 0.28;
      const angle = baseAngle + t * 0.5;
      targetX = Math.cos(angle) * radiusX;
      targetZ = Math.sin(angle) * radiusZ;
      targetY = naturalHeight;
      // Featured/foreground scaling
      const isFront = targetZ > 0;
      targetScale = isFront ? 0.78 + (targetZ / radiusZ) * 0.35 : 0.62;
    } else if (scrollProgress < 0.82) {
      // Stage 3: Spotlight 8 projects in sequence
      const spotlightFraction = (scrollProgress - 0.28) / 0.54;
      const totalRotation = spotlightFraction * Math.PI * 2;
      const cardAngle = baseAngle + 0.5 + totalRotation + Math.PI / 2;

      targetX = Math.cos(cardAngle) * radiusX;
      targetZ = Math.sin(cardAngle) * radiusZ;

      const isForeground = targetZ > radiusZ * 0.55;
      const foregroundFactor = Math.max(0, targetZ / radiusZ);

      if (isForeground) {
        // Spotlight front card: centered in front of pillar
        targetY = naturalHeight * 0.12;
        targetScale = 1.1 + (isHovered ? 0.06 : 0);
      } else {
        targetY = naturalHeight;
        targetScale = 0.55 + foregroundFactor * 0.22;
      }
    } else {
      // Stage 4 & 5: Complete Exhibition & smooth exit
      const t = (scrollProgress - 0.82) / 0.18;
      const angle = baseAngle + 0.5 + Math.PI * 2 + Math.PI / 2 + t * 0.4;
      targetX = Math.cos(angle) * radiusX;
      targetZ = Math.sin(angle) * radiusZ;
      targetY = naturalHeight;
      targetScale = Math.max(0.01, 0.75 * (1 - Math.max(0, (scrollProgress - 0.94) / 0.06)));
    }

    if (isHovered && scrollProgress <= 0.94) {
      targetScale *= 1.06;
      targetZ += 0.25;
      targetY += 0.04;
    }

    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetX, 7, delta);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetY, 7, delta);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetZ, 7, delta);
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 7, delta);

    groupRef.current.position.copy(currentPos.current);
    groupRef.current.scale.setScalar(currentScale.current);

    // Keep card face oriented directly toward camera!
    groupRef.current.lookAt(state.camera.position);

    const sway = Math.sin(state.clock.elapsedTime * 1.2 + index * 0.8) * 0.015;
    groupRef.current.rotation.z = sway;
  });

  // Physical card dimensions: aspect ratio 2 : 1 (width 2.15, height 1.075)
  // Perfectly matching the 540-580px by 260-280px proportion in reference image
  const cardWidth = 2.15;
  const cardHeight = 1.075;

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(index);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
    >
      {/* Front Face Texture Mesh */}
      {cardTexture && (
        <mesh position={[0, 0, 0.002]}>
          <planeGeometry args={[cardWidth, cardHeight]} />
          <meshBasicMaterial map={cardTexture} side={THREE.DoubleSide} transparent />
        </mesh>
      )}

      {/* Back Face Texture Mesh (double-sided so card is never grey from any orbital angle) */}
      {cardTexture && (
        <mesh position={[0, 0, -0.002]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[cardWidth, cardHeight]} />
          <meshBasicMaterial map={cardTexture} side={THREE.DoubleSide} transparent />
        </mesh>
      )}
    </group>
  );
}
