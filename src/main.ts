import "./style.css";
import * as d3 from "d3";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;
const ratio = window.devicePixelRatio;

// canvas.width = width;
// canvas.height = height;
// canvas.style.width = `${width}px`;
// canvas.style.height = `${height}px`;
const width = windowWidth * ratio;
const height = windowHeight * ratio;

canvas.width = windowWidth * ratio;
canvas.height = windowHeight * ratio;
canvas.style.width = windowWidth + "px";
canvas.style.height = windowHeight + "px";

const randomX = d3.randomNormal(windowWidth / 2, 80);
const randomY = d3.randomNormal(windowHeight / 2, 80);
const data = Array.from({ length: 2000 }, () => [randomX(), randomY()]);

function _chart(data: number[][]) {
  const r = 1.5;

  d3.select(context.canvas).call(
    d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", ({ transform }) => zoomed(transform)) as any,
  );

  function zoomed(transform: any) {
    context.save();
    context.clearRect(0, 0, width, height);
    context.translate(transform.x, transform.y);
    context.scale(transform.k, transform.k);
    context.beginPath();
    for (const [x, y] of data) {
      context.moveTo(x + r, y);
      context.arc(x, y, r, 0, 2 * Math.PI);
    }
    context.fill();
    context.restore();
  }

  zoomed(d3.zoomIdentity);

  return context.canvas;
}

_chart(data);
