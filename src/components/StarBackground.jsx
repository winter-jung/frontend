import { useEffect, useRef } from 'react';

function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // StaticStar 클래스 정의
    class StaticStar {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random();
        this.fade = Math.random() * 0.02 + 0.005;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        this.opacity += this.fade;
        if (this.opacity <= 0 || this.opacity >= 1) this.fade *= -1;
        this.draw();
      }
    }

    // ShootingStar 클래스 정의
    class ShootingStar {
      constructor() { this.reset(); }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.4;
        this.len = Math.random() * 120 + 80;
        this.speed = Math.random() * 6 + 4;
        this.angle = (35 + Math.random() * 20) * Math.PI / 180;
        this.opacity = 1;
        this.active = true;
      }

      draw() {
        const grad = ctx.createLinearGradient(
          this.x, this.y,
          this.x + this.len * Math.cos(this.angle),
          this.y + this.len * Math.sin(this.angle)
        );
        grad.addColorStop(0, `rgba(255,255,200,${this.opacity})`);
        grad.addColorStop(0.5, `rgba(255,255,255,${this.opacity * 0.6})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x + this.len * Math.cos(this.angle),
          this.y + this.len * Math.sin(this.angle)
        );
        ctx.stroke();
      }

      update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.opacity -= 0.008;
        if (this.opacity <= 0) this.active = false;
        this.draw();
      }
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const staticStars = Array(150).fill().map(() => new StaticStar());
    let shootingStars = [];
    let lastTime = 0;

    function animate(time) {
      ctx.fillStyle = "rgba(13,7,39,0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      staticStars.forEach(star => star.update());

      if (time - lastTime > 3000 + Math.random() * 3000) {
        shootingStars.push(new ShootingStar());
        lastTime = time;
      }

      shootingStars.forEach((s, i) => {
        s.update();
        if (!s.active) shootingStars.splice(i, 1);
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,  // z-index를 0으로 변경하여 가장 뒤에 위치하도록 함
        backgroundColor: 'rgba(13, 7, 39, 0.49)', // 배경색 투명도 조정
        width: '100%',
        height: '100%'
      }}
    />
  );
}

export default StarBackground;