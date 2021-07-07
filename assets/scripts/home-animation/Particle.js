import Vector from './Vector'

export default class Particle {
  constructor(x, y, color) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(0, 0)
    this.color = color
  }

  move(force) {
    if (this.vel.getLength() > 4) {
      this.vel.setLength(4)
    }
    this.pos.addTo(this.vel)
  }

  draw(ctx, w, h, delta) {
    const r = this.pos.sub(new Vector(w / 2, h / 2)).getLength() / 5
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y - r, r, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}
