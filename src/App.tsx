import { useEffect, useRef } from "react";
import "./App.css";
import { Pinball } from "./pinball";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const snowParticle = new Pinball({
        canvas: canvasRef.current.getContext("2d"),
        width: canvasRef.current.width,
        height: canvasRef.current.height,
      });
      snowParticle.executeLoop();
    }
  }, []);

  return <canvas width={800} height={800} ref={canvasRef} />;
}

export default App;
