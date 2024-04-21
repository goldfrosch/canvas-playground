interface particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  dir: number;
}

export class Pinball {
  private width: number;
  private height: number;

  private particles: particle[] = [];

  private canvas: CanvasRenderingContext2D | null;

  private newLoop = this.loop.bind(this);

  constructor({
    canvas,
    width,
    height,
  }: {
    canvas: CanvasRenderingContext2D | null;
    width: number;
    height: number;
  }) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
  }

  executeLoop() {
    window.requestAnimationFrame(this.newLoop);
  }

  private loop() {
    window.requestAnimationFrame(this.newLoop);
    this.createParticle();
    this.updateParticle();
    this.drawParticle();
  }

  private createParticle() {
    if (this.particles.length <= 1) {
      this.particles.push({
        x: 0,
        y: 160,
        radius: 5,
        color: "white",
        speed: 5,
        dir: 45,
      });
    }
  }

  private updateParticle() {
    for (const i in this.particles) {
      const part = this.particles[i];
      let newDir = part.dir;

      // TODO 각도 움직임에 따른 -90인지 +90인지 추가 계산 로직 필요
      if (part.y >= this.height) {
        newDir = part.dir - 90;
      } else if (part.x >= this.width) {
        newDir = part.dir - 90;
      } else if (part.y < 0) {
        newDir = part.dir - 90;
      } else if (part.x < 0) {
        newDir = part.dir - 90;
      }

      const newX = part.x + part.speed * Math.cos(newDir * (Math.PI / 180));
      const newY = part.y + part.speed * Math.sin(newDir * (Math.PI / 180));

      this.particles[i] = {
        ...this.particles[i],
        x: newX,
        y: newY,
        dir: newDir,
      };
    }
  }

  private drawParticle() {
    const canvas = this.canvas;

    if (canvas) {
      canvas.fillStyle = "#040309";
      canvas.fillRect(0, 0, this.width, this.height);

      for (const i in this.particles) {
        const particle = this.particles[i];

        canvas.beginPath();
        canvas.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        canvas.closePath();

        canvas.fillStyle = particle.color;
        canvas.globalAlpha = 1;

        canvas.fill();
      }
    }
  }
}
