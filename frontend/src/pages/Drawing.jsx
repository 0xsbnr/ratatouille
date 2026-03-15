import { useEffect, useRef, useState } from "react";

export default function Drawing() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const historyRef = useRef([]);
  const redoStackRef = useRef([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("brush");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(6);
  const [eraserSize, setEraserSize] = useState(18);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 600;

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineCap = "round";
    context.lineJoin = "round";

    contextRef.current = context;
    saveSnapshot();
  }, []);

  useEffect(() => {
    const context = contextRef.current;
    if (!context) return;

    if (tool === "eraser") {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "white";
      context.lineWidth = eraserSize;
    } else {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = color;
      context.lineWidth = brushSize;
    }
  }, [tool, color, brushSize, eraserSize]);

  const getPointerPosition = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (event.touches && event.touches.length > 0) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    }

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const saveSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    historyRef.current.push(canvas.toDataURL());

    if (historyRef.current.length > 40) {
      historyRef.current.shift();
    }
  };

  const restoreFromDataUrl = (dataUrl) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const image = new Image();

    image.onload = () => {
      context.globalCompositeOperation = "source-over";
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);

      if (tool === "eraser") {
        context.globalCompositeOperation = "destination-out";
        context.lineWidth = eraserSize;
      } else {
        context.globalCompositeOperation = "source-over";
        context.strokeStyle = color;
        context.lineWidth = brushSize;
      }
    };

    image.src = dataUrl;
  };

  const startDrawing = (event) => {
    event.preventDefault();

    const context = contextRef.current;
    const { x, y } = getPointerPosition(event);

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    event.preventDefault();

    const context = contextRef.current;
    const { x, y } = getPointerPosition(event);

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    const context = contextRef.current;
    context.closePath();
    setIsDrawing(false);
    saveSnapshot();
    redoStackRef.current = [];
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    context.globalCompositeOperation = "source-over";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (tool === "eraser") {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "white";
      context.lineWidth = eraserSize;
    } else {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = color;
      context.lineWidth = brushSize;
    }

    saveSnapshot();
    redoStackRef.current = [];
  };

  const undo = () => {
    if (historyRef.current.length <= 1) return;

    const currentState = historyRef.current.pop();
    redoStackRef.current.push(currentState);

    const previousState = historyRef.current[historyRef.current.length - 1];
    restoreFromDataUrl(previousState);
  };

  const redo = () => {
    if (redoStackRef.current.length === 0) return;

    const restoredState = redoStackRef.current.pop();
    historyRef.current.push(restoredState);
    restoreFromDataUrl(restoredState);
  };

  const saveAsPng = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section className="stack">
      <div>
        <h1 className="hero-title">Time to draw!</h1>
        <p className="hero-text">
          Draw with your mouse or finger according to the topic above in your tile. You can erase, undo or redo!
        </p>
        <h1 className = "hero-text">
        Angel
        </h1>
      </div>

      <div className="card">
        <div className="drawing-toolbar">
          <div className="toolbar-group">
            <button
              onClick={() => setTool("brush")}
              className={tool === "brush" ? "primary-button" : "secondary-button"}
            >
              Brush
            </button>
            <button
              onClick={() => setTool("eraser")}
              className={tool === "eraser" ? "primary-button" : "secondary-button"}
            >
              Eraser
            </button>
          </div>

          <div className="toolbar-group">
            <label className="toolbar-label">
              Colour
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                disabled={tool === "eraser"}
              />
            </label>

            <label className="toolbar-label slider-label">
              Brush size: {brushSize}
              <input
                type="range"
                min="1"
                max="40"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
              />
            </label>

            <label className="toolbar-label slider-label">
              Eraser size: {eraserSize}
              <input
                type="range"
                min="4"
                max="80"
                value={eraserSize}
                onChange={(e) => setEraserSize(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="toolbar-group">
            <button onClick={undo} className="secondary-button">
              Undo
            </button>
            <button onClick={redo} className="secondary-button">
              Redo
            </button>
            <button onClick={clearCanvas} className="secondary-button">
              Clear
            </button>
            <button onClick={saveAsPng} className="primary-button">
              Save as PNG
            </button>
          </div>
        </div>

        <div className="canvas-frame">
          <canvas
            ref={canvasRef}
            className="drawing-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      </div>
    </section>
  );
}