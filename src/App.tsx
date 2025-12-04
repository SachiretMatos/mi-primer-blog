import { useEffect, useRef, useState } from "react";
import { animate, createScope, spring, Scope } from "animejs";

export default function App() {
  const root = useRef<HTMLDivElement | null>(null);

  const scope = useRef<
    Scope & {
      methods: {
        focusInput: (selector: string) => void;
      };
    } | null
  >(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  const [form, setForm] = useState({ username: "", password: "" });

  // ---- SplitText manual ----
  const wrapLetters = (selector: string) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const text = element.textContent || "";
    element.innerHTML = text
      .split("")
      .map((ch) => `<span class="char inline-block text-white font-bold">${ch}</span>`)
      .join("");
  };

  // --- BACKGROUND ANIMATION ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const bg = bgRef.current;
    if (!canvas || !bg) return;

    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = bg.clientWidth);
    let h = (canvas.height = bg.clientHeight);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 4 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Fondo con degradado suave
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#0a0a0a");
      gradient.addColorStop(1, "#181818");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Olas suaves
      ctx.beginPath();
      ctx.moveTo(0, h * 0.8);
      for (let x = 0; x < w; x++) {
        ctx.lineTo(x, h * 0.8 + Math.sin(x * 0.01 + Date.now() * 0.001) * 20);
      }
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Partículas
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    // Anime.js color shifting
    animate(bg, {
      backgroundColor: ["#000000", "#101010", "#1a1a1a", "#000000"],
      duration: 10000,
      easing: "linear",
      loop: true,
    });

    // Resize handler
    const resize = () => {
      w = canvas.width = bg.clientWidth;
      h = canvas.height = bg.clientHeight;
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // --- LOGIN ANIMATION ---
  useEffect(() => {
    const newScope = createScope({ root });

    newScope.add(() => {
      wrapLetters(".title");
      wrapLetters(".label-user");
      wrapLetters(".label-pass");

      animate(".char", {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 400,
        delay: (_target, index) => index * 30,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    });

    newScope.add("focusInput", (selector: string) => {
      animate(selector, {
        scale: [1, 1.03],
        duration: 300,
        ease: spring({ mass: 0.5, bounce: 0.6 }),
      });
    });

    scope.current = newScope as typeof scope.current;

    return () => scope.current?.revert();
  }, []);

  const handleFocus = (selector: string) => {
    scope.current?.methods.focusInput(selector);
  };

  return (
    <div ref={root} className="relative w-screen h-screen flex justify-center items-center overflow-hidden">

      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 -z-10 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>

      {/* Login box */}
      <div className="w-[330px] p-8 bg-black/40 border border-gray-600 
                      rounded-xl backdrop-blur-md flex flex-col gap-4">

        <h2 className="title text-white text-center text-3xl font-bold tracking-widest">
          LOGIN
        </h2>

        <label className="label-user text-white text-sm tracking-wide">
          Username
        </label>
        <input
          id="username"
          className="p-3 rounded-lg bg-black/70 text-white border border-gray-700 focus:outline-none"
          value={form.username}
          onFocus={() => handleFocus("#username")}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <label className="label-pass text-white text-sm tracking-wide">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="p-3 rounded-lg bg-black/70 text-white border border-gray-700 focus:outline-none"
          value={form.password}
          onFocus={() => handleFocus("#password")}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="mt-3 py-3 rounded-lg bg-white font-bold text-black hover:bg-black hover:text-white duration-200">
          Login
        </button>
      </div>
    </div>
  );
}
