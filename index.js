/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  /**@type{HTMLCanvasElement} */
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 400;
  let isDrawing = false;
  ctx.strokeStyle = "white";
  let rotationAngle = 0;
  let rotationSpeed = 0;

  const speedSlider = document.getElementById("speedSlider");

  speedSlider.addEventListener("change", (e) => {
    e.preventDefault();
    rotationSpeed = parseFloat(e.target.value);
    console.log(rotationSpeed);
  });

  canvas.addEventListener("pointerdown", (e) => {
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    isDrawing = true;
    eventInfo = null;
  });
  canvas.addEventListener("pointermove", (e) => {
    eventInfo = e;
  });
  canvas.addEventListener("pointerup", (e) => {
    isDrawing = false;
  });
  canvas.addEventListener("pointerleave", (e) => {
    isDrawing = false;
  });

  function animate() {
    rotationAngle += rotationSpeed;
    canvas.style.transform =
      "translate(-50%, -50%) rotate(" + rotationAngle + "deg)";
    if (isDrawing == true && eventInfo) {
      const xylToCenterPage = {
        x: eventInfo.pageX - window.innerWidth / 2,
        y: eventInfo.pageY - window.innerHeight / 2,
      };

      const pol = toPolar(xylToCenterPage);
      pol.dir -= rotationAngle * (Math.PI / 180);
      const xyWithRotation = toXY(pol);
      xyWithRotation.x += canvas.width / 2;
      xyWithRotation.y += canvas.height / 2;

      ctx.lineTo(xyWithRotation.x, xyWithRotation.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xyWithRotation.x, xyWithRotation.y);
    }

    requestAnimationFrame(animate);
  }
  animate();

  function toPolar({ x, y }) {
    return {
      dir: Math.atan2(y, x),
      mag: Math.hypot(x, y),
    };
  }

  function toXY({ mag, dir }) {
    return {
      x: Math.cos(dir) * mag,
      y: Math.sin(dir) * mag,
    };
  }

  //load function end
});
