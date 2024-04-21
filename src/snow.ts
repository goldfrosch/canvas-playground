interface particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  lastMoveDir: number;
}

export class Snow {
  private tick = 0;
  private maxParticle = 100;
  private width: number = 0;
  private height: number = 0;
  private particles: particle[] = [];

  private canvas: CanvasRenderingContext2D | null;

  private newLoop = this.loop.bind(this);

  constructor({
    canvas,
    maxParticle = 100,
    width,
    height,
  }: {
    canvas: CanvasRenderingContext2D | null;
    maxParticle?: number;
    width: number;
    height: number;
  }) {
    this.canvas = canvas;
    this.maxParticle = maxParticle;
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
    this.resetParticle();
    this.drawParticle();
  }

  private createParticle() {
    if (this.tick % 10 === 0) {
      if (this.particles.length < this.maxParticle) {
        this.particles.push({
          x: Math.random() * 1000,
          y: 0,
          radius: Math.random() * 4 + 1,
          color: "white",
          speed: Math.random() * 1 + 0.2,
          lastMoveDir: 0,
        });
      }
    }
    if (this.tick === 600) {
      this.tick = 0;
    } else {
      this.tick++;
    }
  }

  private updateParticle() {
    for (const i in this.particles) {
      const part = this.particles[i];
      const ran = Math.random() + part.lastMoveDir;

      if (this.tick % 5 === 0) {
        if (ran > 0.3) {
          part.x += part.speed;
          if (part.lastMoveDir < 0) {
            part.lastMoveDir = 0.1;
          } else {
            part.lastMoveDir += 0.1;
          }
        } else {
          part.x -= part.speed;
          if (part.lastMoveDir > 0) {
            part.lastMoveDir = -0.1;
          } else {
            part.lastMoveDir -= 0.1;
          }
        }
      }

      if (part.lastMoveDir === Math.abs(0.4)) {
        part.lastMoveDir = 0;
      }

      part.y += part.speed;
    }
  }

  private resetParticle() {
    for (const i in this.particles) {
      const part = this.particles[i];
      if (part.y > this.height) {
        this.particles[i] = {
          x: Math.random() * 1000,
          y: 0,
          radius: Math.random() * 4 + 1,
          color: "white",
          speed: Math.random() * 1 + 0.2,
          lastMoveDir: 0,
        };
      }
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
