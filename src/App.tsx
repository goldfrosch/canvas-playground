import { useEffect, useRef } from "react";
import "./App.css";
import { Snow } from "./snow";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const snowParticle = new Snow({
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
