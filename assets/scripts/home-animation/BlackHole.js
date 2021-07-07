import Vector from './Vector'

export default class BlackHole {
  constructor(x, y) {
    this.pos = new Vector(x, y)
  }

  applyGravityOn(thing) {
    const dist = thing.pos.sub(this.pos)
    const length = dist.getLength()
    const g = 2000 / (length * length)

    // We keep the angle of the distance
    dist.setLength(g)
    thing.vel.subFrom(dist)
  }
}
