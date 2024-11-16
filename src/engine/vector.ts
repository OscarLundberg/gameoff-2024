export class Vec3 {
  constructor(public x: number, public y = x, public z = x) { }

  dist(other: Vec3) {
    const a = this;
    const b = other;
    return Math.sqrt(((b.x - a.x) ** 2) + ((b.y - a.y) ** 2) + ((b.z - a.z) ** 2))
  }
}


export class Vec2 {
  public x: number;
  public y: number;
  constructor(vec3: Vec3);
  constructor(x: number | Vec3, y: number);
  constructor(x: number | Vec3, y?: number) {
    if (typeof x == "number") {
      this.x = x;
      this.y = y ?? x;
    }
    else {
      this.x = x.x;
      this.y = x.y;
    }
  }

  dist(other: Vec2) {
    const a = this;
    const b = other;
    return Math.sqrt(((b.x - a.x) ** 2) + ((b.y - a.y) ** 2))
  }
}