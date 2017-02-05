function DodecaHexaSquareTiling(r) {
  this.polys = [];
  this.sides = 12;
  this.r    = r;
  this.beta = Math.PI/this.sides;
  this.side = this.r*sin(Math.PI/this.sides);
  this.h12  = this.r*cos(this.beta);
  this.side = this.r*sin(this.beta);
  this.r6   = this.side/Math.sin(Math.PI/6);
  this.h6   = this.r6*cos(Math.PI/6);
  this.r4   = this.side/Math.sin(Math.PI/4);
  this.h4   = this.r4*cos(Math.PI/4);
  this.h    = this.h12+this.h4;
  this.w    = 2*this.h12+4*this.h6+2*this.h4;
  
  this.buildCell = function(x, y) {
    var sides = this.sides;
    var p;
    p = build_poly(x,y,this.r,this.sides);
    this.polys.push(p);
    // var h12 = r*cos(Math.PI/sides);
    // var side = r*sin(Math.PI/sides);
    // side is common to all, so we also have
    // side =r4*sin(Math.PI/4);
    // side =r6*sin(Math.PI/6);
    //Not enough we got to get r4 and r6;
    // var r6 = side/Math.sin(Math.PI/6);
    // var r4 = side/Math.sin(Math.PI/4);
    // var h6 = r6*cos(Math.PI/6);
    // var h4 = r4*cos(Math.PI/4);
    var d4 = this.h12+this.h4;
    p = build_poly(x,y+d4,this.r4,4);
    this.polys.push(p);

    var D4A = p5.Vector.fromAngle(2*this.beta);
    D4A.setMag(d4);
    p = build_poly(x+D4A.x,y+D4A.y,this.r4,4,Math.PI/6);
    this.polys.push(p);

    var D4B = p5.Vector.fromAngle(-2*this.beta);
    D4B.setMag(d4);
    p = build_poly(x+D4B.x,y+D4B.y,this.r4,4,-Math.PI/6);
    this.polys.push(p);

    var d6 = this.h12+this.h6;
    p = build_poly(x+d6,y,this.r6,6);
    this.polys.push(p);

    var D6 = p5.Vector.fromAngle(4*this.beta);
    D6.setMag(d6);
    p = build_poly(x+D6.x,y+D6.y,this.r6,6,Math.PI/3);
    this.polys.push(p);

    /*
    p = new Polygon();

    // rotate 360 degrees around the clock in 60 degree increments
    var inc = 2 * Math.PI / sides;
    for (var index = 0; index < sides; index++) {
      // angular to cartesian
      var θ = (index * inc) - inc / 2;
      var vX = x + r * Math.cos(θ);
      var vY = y + r * Math.sin(θ);
      p.addVertex(vX, vY);
    }
    p.close();
    p = new Polygon();
    */
  }

  // http://www.redblobgames.com/grids/hexagons/
  this.buildGrid = function() {
    // console.log("h4 : ",h4);
    //What I'm trying to do here is this:
    var h = this.h;
    var w = this.w;
    var inc = h
    // TODO: get dimensions from somewhere
    var dim =400;
    var row = 0;
    for (var y = -h / 2; y < dim + h/2; y += inc) {
      var startX = ((row % 2) == 0) ? -w : -w / 2;
      for (var x = startX; x < dim; x += w) {
        this.buildCell(x, y);
      }
      row++;
    }
    /*
    */

  }

}
    // Now I have to add two rotated polygons , another square
    // and another hexagon;
function build_poly(x,y,r,sides,init_angle) {
    p = new Polygon();
    if(!init_angle)init_angle = 0;
    // rotate 360 degrees around the clock in 60 degree increments
    var inc = 2 * Math.PI / sides;
    for (var index = 0; index < sides; index++) {
      // angular to cartesian
      var θ = (index * inc) - inc / 2+init_angle;
      var vX = x + r * Math.cos(θ);
      var vY = y + r * Math.sin(θ);
      p.addVertex(vX, vY);
    }
    p.close();
    return p;
}
