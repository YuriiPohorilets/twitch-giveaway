import { useMemo, CSSProperties } from "react";
import styles from "./Confetti.module.css";

type Shape = "strip" | "dot" | "curl";

interface Piece {
  id: number;
  left: number; // %
  color: string;
  shape: Shape;
  size: number; // px
  duration: number; // s
  delay: number; // s
  drift: number; // px, horizontal sway distance
  spinDir: 1 | -1;
}

const PALETTE = ["#FF6B6B", "#FFD93D", "#4ECDC4", "#9B5DE5", "#45AAFF", "#FF9F1C"];
const SHAPES: Shape[] = ["strip", "dot", "curl"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: randomBetween(0, 100),
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    size: randomBetween(6, 14),
    duration: randomBetween(2.6, 4.6),
    delay: randomBetween(0, 0.9),
    drift: randomBetween(-60, 60),
    spinDir: Math.random() > 0.5 ? 1 : -1,
  }));
}

/** CSSProperties plus the two custom properties our keyframes read from. */
interface PieceStyle extends CSSProperties {
  "--drift": string;
  "--spin": string;
}

interface ConfettiProps {
  /** How many confetti pieces to render */
  count?: number;
  /** Stage background. Defaults to transparent so it can overlay any content. */
  background?: string;
  /** Extra class applied to the root overlay element */
  className?: string;
}

export default function Confetti({
  count = 90,
  background = "transparent",
  className,
}: ConfettiProps) {
  const pieces = useMemo(() => makePieces(count), [count]);

  return (
    <div
      className={[styles.stage, className].filter(Boolean).join(" ")}
      style={{ background }}
      aria-hidden="true"
    >
      {pieces.map(p => {
        const style: PieceStyle = {
          left: `${p.left}%`,
          backgroundColor: p.shape !== "curl" ? p.color : undefined,
          borderColor: p.shape === "curl" ? p.color : undefined,
          width: `${p.size}px`,
          height: p.shape === "strip" ? `${p.size * 2.4}px` : `${p.size}px`,
          animationDuration: `${p.duration}s, ${p.duration * 0.5}s`,
          animationDelay: `${p.delay}s, ${p.delay}s`,
          "--drift": `${p.drift}px`,
          "--spin": String(p.spinDir),
        };
        return <span key={p.id} className={`${styles.piece} ${styles[p.shape]}`} style={style} />;
      })}
    </div>
  );
}
