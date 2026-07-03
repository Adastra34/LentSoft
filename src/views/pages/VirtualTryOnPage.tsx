import { useState, useEffect, useRef, useCallback } from "react";
import { useOutletContext, Navigate } from "react-router";
import { Camera, X, Check, Info, DollarSign, Ruler, Sparkles, CameraOff, ScanFace } from "lucide-react";
import { useAuth } from "../../controllers/contexts/AuthContext";
import { formatPrice } from "../../models/data/products";
import * as THREE from "three";

interface OutletContext {
  textSize: number;
}

interface Frame {
  id: number;
  nombre: string;
  estilo: string;
  precio: number;
  tamaño: string;
  imagen: string;
  descripcion?: string;
}

const mockFrames: Frame[] = [
  {
    id: 1,
    nombre: "Classic Aviator",
    estilo: "Aviador",
    precio: 289900,
    tamaño: "54-18-140",
    imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
    descripcion: "Marco clásico de aviador con diseño atemporal"
  },
  {
    id: 2,
    nombre: "Modern Wayfarer",
    estilo: "Wayfarer",
    precio: 249900,
    tamaño: "52-20-145",
    imagen: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=300&fit=crop",
    descripcion: "Estilo moderno con líneas definidas"
  },
  {
    id: 3,
    nombre: "Round Vintage",
    estilo: "Redondo",
    precio: 199900,
    tamaño: "48-22-140",
    imagen: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
    descripcion: "Diseño vintage de inspiración retro"
  },
  {
    id: 4,
    nombre: "Cat Eye Elegance",
    estilo: "Cat Eye",
    precio: 329900,
    tamaño: "53-16-140",
    imagen: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=400&h=300&fit=crop",
    descripcion: "Elegante marco estilo ojo de gato"
  },
  {
    id: 5,
    nombre: "Sport Pro",
    estilo: "Deportivo",
    precio: 349900,
    tamaño: "56-15-135",
    imagen: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop",
    descripcion: "Marco deportivo de alto rendimiento"
  },
  {
    id: 6,
    nombre: "Minimalist Square",
    estilo: "Cuadrado",
    precio: 279900,
    tamaño: "51-19-145",
    imagen: "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=400&h=300&fit=crop",
    descripcion: "Diseño minimalista con forma cuadrada"
  },
  {
    id: 7,
    nombre: "Oval Classic",
    estilo: "Oval",
    precio: 219900,
    tamaño: "50-20-142",
    imagen: "https://images.unsplash.com/photo-1622506636454-c4d65e0d4b9c?w=400&h=300&fit=crop",
    descripcion: "Marco ovalado clásico y versátil"
  },
  {
    id: 8,
    nombre: "Browline Retro",
    estilo: "Browline",
    precio: 269900,
    tamaño: "52-18-145",
    imagen: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop",
    descripcion: "Estilo retro con línea de cejas pronunciada"
  }
];

export function VirtualTryOnPage() {
  const { textSize } = useOutletContext<OutletContext>();
  const { user } = useAuth();
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(mockFrames[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [arReady, setArReady] = useState(false);
  const [facesDetected, setFacesDetected] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const faceMeshRef = useRef<any>(null);
  const rafRef = useRef<number>(0);
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    leftLens: THREE.Mesh;
    rightLens: THREE.Mesh;
    bridge: THREE.Mesh;
  } | null>(null);

  /* ── Frame colour by style ────────────────────────────── */
  const frameColorMap: Record<string, number> = {
    Aviador: 0xffd700,
    Wayfarer: 0x1a1a1a,
    Redondo: 0x8b4513,
    "Cat Eye": 0x800020,
    Deportivo: 0x0057b7,
    Cuadrado: 0x2c2c2c,
    Oval: 0x8b6914,
    Browline: 0x3d2b1f,
  };

  /* ── Initialize Three.js glasses ─────────────────────── */
  const initThree = useCallback((w: number, h: number) => {
    const canvas = threeCanvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -1000, 1000);
    camera.position.z = 100;

    const fColor = frameColorMap[selectedFrame?.estilo ?? "Cuadrado"] ?? 0x7c3aed;
    const mat = new THREE.MeshStandardMaterial({ color: fColor, roughness: 0.3, metalness: 0.7 });

    // Two torus rings for lenses
    const leftLens = new THREE.Mesh(new THREE.TorusGeometry(30, 3.5, 12, 50), mat.clone());
    const rightLens = new THREE.Mesh(new THREE.TorusGeometry(30, 3.5, 12, 50), mat.clone());
    const bridge = new THREE.Mesh(
      new THREE.BoxGeometry(20, 4, 4),
      new THREE.MeshStandardMaterial({ color: fColor, roughness: 0.3, metalness: 0.6 })
    );

    // Lenses: flat so they look like glasses rims
    leftLens.scale.set(1, 0.65, 0.15);
    rightLens.scale.set(1, 0.65, 0.15);

    // Lens tints
    const tintMat = new THREE.MeshStandardMaterial({ color: 0x9333ea, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
    const leftTint = new THREE.Mesh(new THREE.CircleGeometry(27, 32), tintMat.clone());
    const rightTint = new THREE.Mesh(new THREE.CircleGeometry(27, 32), tintMat.clone());
    leftTint.scale.set(1, 0.65, 1);
    rightTint.scale.set(1, 0.65, 1);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(0, 0, 100);
    scene.add(ambient, dirLight, leftLens, rightLens, bridge, leftTint, rightTint);

    threeRef.current = { renderer, scene, camera, leftLens, rightLens, bridge };
  }, [selectedFrame]);

  /* ── Draw glasses on 2D canvas (Face Mesh landmarks) ─── */
  const drawGlasses = useCallback((
    ctx: CanvasRenderingContext2D,
    landmarks: Array<{ x: number; y: number; z: number }>,
    w: number, h: number
  ) => {
    const p = (i: number) => ({ x: landmarks[i].x * w, y: landmarks[i].y * h, z: landmarks[i].z });

    // Key eye landmarks
    const lEyeOut = p(33); const lEyeIn = p(133);
    const rEyeIn  = p(362); const rEyeOut = p(263);
    const lEyeTop = p(159); const lEyeBot = p(145);
    const rEyeTop = p(386); const rEyeBot = p(374);

    const lCx = (lEyeOut.x + lEyeIn.x) / 2;
    const lCy = (lEyeTop.y + lEyeBot.y) / 2;
    const rCx = (rEyeOut.x + rEyeIn.x) / 2;
    const rCy = (rEyeTop.y + rEyeBot.y) / 2;

    const eyeSpan = Math.abs(rEyeOut.x - lEyeOut.x);
    const lensW = eyeSpan * 0.42;
    const lensH = lensW * 0.62;
    const bevel = lensW * 0.18;

    // Face rotation angle
    const angle = Math.atan2(rCy - lCy, rCx - lCx);

    const fColor = frameColorMap[selectedFrame?.estilo ?? "Cuadrado"] ?? 0x7c3aed;
    const cssColor = `#${fColor.toString(16).padStart(6, "0")}`;
    const lw = Math.max(lensW * 0.065, 2.5);

    ctx.clearRect(0, 0, w, h);

    const drawLens = (cx: number, cy: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      // Frame
      ctx.beginPath();
      if (selectedFrame?.estilo === "Redondo" || selectedFrame?.estilo === "Oval") {
        ctx.ellipse(0, 0, lensW / 2, lensH / 2, 0, 0, Math.PI * 2);
      } else if (selectedFrame?.estilo === "Aviador") {
        ctx.ellipse(0, lensH * 0.06, lensW / 2, lensH / 2 * 1.1, 0, 0, Math.PI * 2);
      } else if (selectedFrame?.estilo === "Cat Eye") {
        ctx.moveTo(-lensW / 2, lensH * 0.1);
        ctx.quadraticCurveTo(-lensW / 2, -lensH / 2, 0, -lensH / 2 * 1.1);
        ctx.quadraticCurveTo(lensW / 2, -lensH / 2 * 1.4, lensW / 2, 0);
        ctx.quadraticCurveTo(lensW / 2, lensH / 2, 0, lensH / 2);
        ctx.quadraticCurveTo(-lensW / 2, lensH / 2, -lensW / 2, lensH * 0.1);
        ctx.closePath();
      } else {
        ctx.roundRect(-lensW / 2, -lensH / 2, lensW, lensH, bevel);
      }
      // Tinted fill
      ctx.fillStyle = `${cssColor}22`;
      ctx.fill();
      // Rim
      ctx.strokeStyle = cssColor;
      ctx.lineWidth = lw;
      ctx.shadowColor = cssColor;
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    drawLens(lCx, lCy);
    drawLens(rCx, rCy);

    // Bridge
    ctx.save();
    ctx.beginPath();
    const bridgeY = (lCy + rCy) / 2;
    ctx.moveTo(lCx + (lensW / 2 + 1) * Math.cos(angle), lCy + (lensW / 2 + 1) * Math.sin(angle));
    ctx.lineTo(rCx - (lensW / 2 + 1) * Math.cos(angle), rCy - (lensW / 2 + 1) * Math.sin(angle));
    ctx.strokeStyle = cssColor;
    ctx.lineWidth = lw * 0.8;
    ctx.stroke();
    ctx.restore();

    // Temples (arms)
    const tL = { x: lEyeOut.x, y: lEyeOut.y };
    const tR = { x: rEyeOut.x, y: rEyeOut.y };
    const tLen = eyeSpan * 0.55;
    ctx.save();
    ctx.strokeStyle = cssColor;
    ctx.lineWidth = lw * 0.7;
    ctx.beginPath();
    ctx.moveTo(tL.x - lensW / 2 * Math.cos(angle), tL.y - lensW / 2 * Math.sin(angle));
    ctx.lineTo(tL.x - (lensW / 2 + tLen) * Math.cos(angle), tL.y - (lensW / 2 + tLen) * Math.sin(angle));
    ctx.moveTo(tR.x + lensW / 2 * Math.cos(angle), tR.y + lensW / 2 * Math.sin(angle));
    ctx.lineTo(tR.x + (lensW / 2 + tLen) * Math.cos(angle), tR.y + (lensW / 2 + tLen) * Math.sin(angle));
    ctx.stroke();
    ctx.restore();

    // Update Three.js glasses position
    if (threeRef.current) {
      const t = threeRef.current;
      const hw = w / 2; const hh = h / 2;
      const lr = lensW * 0.48;

      t.leftLens.position.set(lCx - hw, -(lCy - hh), 0);
      t.leftLens.scale.set(lr / 30, (lr * 0.62) / 30, 0.15);
      t.leftLens.rotation.z = -angle;

      t.rightLens.position.set(rCx - hw, -(rCy - hh), 0);
      t.rightLens.scale.set(lr / 30, (lr * 0.62) / 30, 0.15);
      t.rightLens.rotation.z = -angle;

      t.bridge.position.set((lCx + rCx) / 2 - hw, -((lCy + rCy) / 2 - hh), 0);
      t.bridge.scale.set((rCx - lCx - lensW) / 20, 1, 1);
      t.bridge.rotation.z = -angle;

      const fColor = frameColorMap[selectedFrame?.estilo ?? ""] ?? 0x7c3aed;
      (t.leftLens.material as THREE.MeshStandardMaterial).color.set(fColor);
      (t.rightLens.material as THREE.MeshStandardMaterial).color.set(fColor);
      (t.bridge.material as THREE.MeshStandardMaterial).color.set(fColor);

      t.renderer.render(t.scene, t.camera);
    }
  }, [selectedFrame]);

  /* ── Start MediaPipe Face Mesh ────────────────────────── */
  const initAR = useCallback(async () => {
    setArReady(false);
    try {
      const { FaceMesh } = await import("@mediapipe/face_mesh");

      const faceMesh = new FaceMesh({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results: any) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const count = results.multiFaceLandmarks?.length ?? 0;
        setFacesDetected(count);

        if (count > 0) {
          drawGlasses(ctx, results.multiFaceLandmarks[0], canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });

      faceMeshRef.current = faceMesh;
      setArReady(true);

      // Processing loop
      const processFrame = async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) {
          rafRef.current = requestAnimationFrame(processFrame);
          return;
        }
        await faceMeshRef.current.send({ image: videoRef.current });
        rafRef.current = requestAnimationFrame(processFrame);
      };
      processFrame();
    } catch {
      // MediaPipe load failed — keep demo mode visuals
      setArReady(false);
    }
  }, [drawGlasses]);

  /* ── Sync canvas size with video ─────────────────────── */
  const syncCanvasSize = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const three = threeCanvasRef.current;
    if (!video || !canvas || !three) return;
    const w = video.videoWidth || video.clientWidth;
    const h = video.videoHeight || video.clientHeight;
    if (w > 0 && h > 0) {
      canvas.width = w; canvas.height = h;
      three.width = w; three.height = h;
      if (threeRef.current) {
        threeRef.current.renderer.setSize(w, h);
        threeRef.current.camera.left = -w / 2;
        threeRef.current.camera.right = w / 2;
        threeRef.current.camera.top = h / 2;
        threeRef.current.camera.bottom = -h / 2;
        threeRef.current.camera.updateProjectionMatrix();
      } else {
        initThree(w, h);
      }
    }
  }, [initThree]);

  // Redirigir si no está autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      stopCamera();
      threeRef.current?.renderer.dispose();
    };
  }, []);

  /* When real camera becomes active, start AR */
  useEffect(() => {
    if (cameraActive && !demoMode && videoRef.current) {
      const video = videoRef.current;
      const onReady = () => {
        syncCanvasSize();
        initAR();
      };
      if (video.readyState >= 2) onReady();
      else video.addEventListener("loadeddata", onReady, { once: true });
    } else {
      // Reset AR state when camera stops
      cancelAnimationFrame(rafRef.current);
      faceMeshRef.current = null;
      setArReady(false);
      setFacesDetected(0);
      canvasRef.current && (canvasRef.current.getContext("2d")?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height));
    }
  }, [cameraActive, demoMode, syncCanvasSize, initAR]);

  /* Redraw glasses when frame selection changes */
  useEffect(() => {
    if (threeRef.current && selectedFrame) {
      const fColor = frameColorMap[selectedFrame.estilo] ?? 0x7c3aed;
      (threeRef.current.leftLens.material as THREE.MeshStandardMaterial).color.set(fColor);
      (threeRef.current.rightLens.material as THREE.MeshStandardMaterial).color.set(fColor);
      (threeRef.current.bridge.material as THREE.MeshStandardMaterial).color.set(fColor);
    }
  }, [selectedFrame]);

  const startCamera = async () => {
    setCameraError(null);
    setDemoMode(false);

    // Check if mediaDevices API is available
    if (!navigator.mediaDevices?.getUserMedia) {
      setDemoMode(true);
      setCameraActive(true);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (error: unknown) {
      // NotAllowedError / NotFoundError / SecurityError → fall back to demo mode
      const name = error instanceof Error ? error.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError" || name === "SecurityError" || name === "NotFoundError") {
        setDemoMode(true);
        setCameraActive(true);
      } else {
        setCameraError("No se pudo acceder a la cámara. Por favor, verifica los permisos.");
        setCameraActive(false);
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setDemoMode(false);
  };

  const toggleCamera = () => {
    if (cameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 pb-20 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-purple-900 mb-2" style={{ fontSize: `${textSize * 2}rem` }}>
            Catálogo y Vista de Marcos
          </h1>
          <p className="text-purple-600" style={{ fontSize: `${textSize * 0.875}rem` }}>
            Prueba virtual con realidad aumentada - Encuentra el marco perfecto para ti
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vista Previa Interactiva - Lado Izquierdo */}
          <div className="bg-white rounded-3xl shadow-lg p-6 order-2 lg:order-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.5}rem` }}>
                Vista Previa Interactiva
              </h2>
              <button
                onClick={toggleCamera}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
                  cameraActive
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {cameraActive ? (
                  <>
                    <CameraOff className="w-5 h-5" />
                    <span className="hidden sm:inline">Detener Cámara</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    <span className="hidden sm:inline">Activar Cámara</span>
                  </>
                )}
              </button>
            </div>

            {/* Camera Preview Area */}
            <div className="relative bg-purple-900 rounded-2xl overflow-hidden aspect-[4/3]">
              {cameraActive && !demoMode && (
                <>
                  {/* Video feed */}
                  <video
                    ref={videoRef}
                    autoPlay playsInline muted
                    className="w-full h-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  {/* 2D glasses canvas (landmarks) */}
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  {/* Three.js 3D depth canvas */}
                  <canvas
                    ref={threeCanvasRef}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  {/* Status badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${arReady ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}>
                      <ScanFace className="w-3.5 h-3.5" />
                      {arReady ? "MediaPipe AR Activo" : "Cargando AR…"}
                    </div>
                    {arReady && (
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${facesDetected > 0 ? "bg-purple-600 text-white" : "bg-black/50 text-white/80"}`}>
                        {facesDetected > 0 ? `✓ Cara detectada — ${selectedFrame?.nombre}` : "Posiciona tu cara frente a la cámara"}
                      </div>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-mono">
                    Face Mesh · Three.js
                  </div>
                </>
              )}

              {/* Demo / Simulated AR mode */}
              {cameraActive && demoMode && (
                <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Animated gradient background simulating a "scene" */}
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-800 via-purple-700 to-purple-900 animate-pulse" style={{ animationDuration: "3s" }} />
                  {/* Simulated face silhouette */}
                  <svg viewBox="0 0 200 240" className="relative z-10 w-36 h-44 opacity-30" fill="white">
                    <ellipse cx="100" cy="110" rx="68" ry="85" />
                    <ellipse cx="100" cy="220" rx="90" ry="40" />
                  </svg>
                  {/* Frame overlay on face */}
                  {selectedFrame && (
                    <div className="absolute z-20 flex flex-col items-center" style={{ top: "28%" }}>
                      <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-1 text-white text-xs font-semibold mb-2">
                        {selectedFrame.nombre}
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Left lens */}
                        <div className="w-16 h-10 border-[3px] border-purple-300 rounded-xl shadow-lg bg-purple-400/20 backdrop-blur-sm" />
                        {/* Bridge */}
                        <div className="w-4 h-1 bg-purple-300 rounded-full" />
                        {/* Right lens */}
                        <div className="w-16 h-10 border-[3px] border-purple-300 rounded-xl shadow-lg bg-purple-400/20 backdrop-blur-sm" />
                      </div>
                      {/* Temple arms */}
                      <div className="flex items-center justify-between w-44 -mt-5">
                        <div className="w-8 h-1 bg-purple-300 rounded-full" />
                        <div className="w-8 h-1 bg-purple-300 rounded-full" />
                      </div>
                    </div>
                  )}
                  {/* Demo mode badge */}
                  <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-30">
                    <Sparkles className="w-3 h-3" />
                    Modo Demo
                  </div>
                  <p className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-xs z-30 px-4">
                    Vista simulada · Permite el acceso a la cámara para AR en tiempo real
                  </p>
                </div>
              )}

              {!cameraActive && !cameraError && (
                <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
                  <Camera className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-center mb-2 font-semibold" style={{ fontSize: `${textSize * 1.125}rem` }}>
                    Activa la cámara para probar los marcos
                  </p>
                  <p className="text-center text-sm opacity-75">
                    Visualiza en tiempo real cómo te quedan los diferentes estilos
                  </p>
                </div>
              )}

              {cameraError && (
                <div className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center text-white p-8">
                  <CameraOff className="w-16 h-16 mb-4" />
                  <p className="text-center font-semibold mb-2">{cameraError}</p>
                  <p className="text-center text-sm opacity-90">
                    Verifica que tu navegador tenga permisos de cámara habilitados
                  </p>
                </div>
              )}
            </div>

            {/* Selected Frame Info Card */}
            {selectedFrame && (
              <div className="mt-6 bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-purple-900 font-bold mb-4 flex items-center gap-2" style={{ fontSize: `${textSize * 1.25}rem` }}>
                  <Info className="w-5 h-5" />
                  Marco Seleccionado
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Nombre</p>
                      <p className="text-purple-900 font-semibold" style={{ fontSize: `${textSize * 1}rem` }}>
                        {selectedFrame.nombre}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Estilo</p>
                      <p className="text-purple-900 font-semibold">{selectedFrame.estilo}</p>
                    </div>
                    <div>
                      <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        Tamaño
                      </p>
                      <p className="text-purple-900 font-semibold text-sm">{selectedFrame.tamaño}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-200">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-600 text-sm font-medium flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Precio
                      </span>
                      <span className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.5}rem` }}>
                        {formatPrice(selectedFrame.precio)}
                      </span>
                    </div>
                  </div>

                  {selectedFrame.descripcion && (
                    <div className="pt-3 border-t border-purple-200">
                      <p className="text-purple-700 text-sm">{selectedFrame.descripcion}</p>
                    </div>
                  )}
                </div>

                <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Agregar al Carrito
                </button>
              </div>
            )}
          </div>

          {/* Galería de Marcos - Lado Derecho */}
          <div className="bg-white rounded-3xl shadow-lg p-6 order-1 lg:order-2">
            <h2 className="text-purple-900 font-bold mb-6" style={{ fontSize: `${textSize * 1.5}rem` }}>
              Galería de Marcos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto pr-2">
              {mockFrames.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame)}
                  className={`relative bg-white rounded-2xl border-2 overflow-hidden transition-all text-left ${
                    selectedFrame?.id === frame.id
                      ? "border-purple-600 shadow-lg scale-105"
                      : "border-purple-100 hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-purple-50">
                    <img
                      src={frame.imagen}
                      alt={frame.nombre}
                      className="w-full h-full object-cover"
                    />
                    {selectedFrame?.id === frame.id && (
                      <div className="absolute top-2 right-2 bg-purple-600 text-white p-1.5 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-purple-900 font-bold mb-1" style={{ fontSize: `${textSize * 1}rem` }}>
                      {frame.nombre}
                    </h3>
                    <p className="text-purple-600 text-sm mb-2">{frame.estilo}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.125}rem` }}>
                        {formatPrice(frame.precio)}
                      </span>
                      <span className="text-purple-600 text-xs flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        {frame.tamaño}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
          <h3 className="text-purple-900 font-bold mb-4 flex items-center gap-2" style={{ fontSize: `${textSize * 1.25}rem` }}>
            <Info className="w-5 h-5" />
            Cómo Usar la Prueba Virtual
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="text-purple-900 font-semibold mb-1">Selecciona un marco</p>
                <p className="text-purple-700 text-sm">Elige el estilo que te guste de la galería</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="text-purple-900 font-semibold mb-1">Activa la cámara</p>
                <p className="text-purple-700 text-sm">Permite el acceso para ver la previsualización</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="text-purple-900 font-semibold mb-1">Prueba en tiempo real</p>
                <p className="text-purple-700 text-sm">Visualiza cómo te queda el marco seleccionado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
