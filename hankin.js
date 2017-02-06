// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video: https://youtu.be/sJ6pMLp_IaI
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

function Hankin(a, v) {
  this.a = a;
  this.v = v;//direction to where the arm points
  this.b = p5.Vector.add(a, v);
  this.end;
  this.prevD;

  this.show = function() {
    stroke(255);
    strokeWeight(0.52);
    line(this.a.x, this.a.y, this.end.x, this.end.y);
    // fill(255);
    // ellipse(this.a.x, this.a.y, 8);
    // if (this.end) {
    //   fill(255, 255, 0);
    //   ellipse(this.end.x, this.end.y, 8);
    // }
  }

  this.findEnd = function(other,poly,vertex) {
    if(hankinMethod==="intersection"){
      // line line intersection???
      // this.a, this.v  (P1, P2-P1)
      // other.a, other.v (P3, P4-P3)

      // From: http://paulbourke.net/geometry/pointlineplane/
      var den = (other.v.y * this.v.x) - (other.v.x * this.v.y);
      if (!den) {
        return;
      }
      var numa = (other.v.x * (this.a.y - other.a.y)) - (other.v.y * (this.a.x - other.a.x));
      var numb = (this.v.x * (this.a.y - other.a.y)) - (this.v.y * (this.a.x - other.a.x));
      var ua = numa / den;
      var ub = numb / den;
      var x = this.a.x + (ua * this.v.x);
      var y = this.a.y + (ua * this.v.y);

      if (ua > 0 && ub > 0) {
        var candidate = createVector(x, y);
        var d1 = p5.Vector.dist(candidate, this.a);
        var d2 = p5.Vector.dist(candidate, other.a);
        var d = d1 + d2;
        var diff = abs(d1 - d2);
        if (diff < 0.001) {
          if (!this.end) {
            this.end = candidate;
            this.prevD = d;
          } else if (d < this.prevD) {
            this.prevD = d;
            this.end = candidate;
          }
        }
      }
    }else if(hankinMethod==="sine_law"){


      var alph = PI / 2 - PI / poly.sides; // tile corner half-angle
      var l = poly.radius * Math.cos(alph); // tile half-base

      var del = delta; // Hankin base offset
      var theta = radians(angle);
      var beta = PI - alph - theta; // Hankin intersection angle
      var d = sin(-alph) / sin(beta) * (l + del); // Hankin length

      this.end = p5.Vector.add(a, v.setMag(d));


    }else if(hankinMethod==="ratio"){
      this.end = vertex.copy().lerp(poly.center,ratio);
    }
  }

}
