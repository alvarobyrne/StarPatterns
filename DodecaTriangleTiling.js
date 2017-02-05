function DodecaTriangleTiling(r) {
  this.polys = [];
  this.sides = 12;
  this.r     = r;
  this.beta  = Math.PI/this.sides;
  this.h12   = this.r*cos(this.beta);
  this.side  = this.r*sin(this.beta);
  this.beta3 = Math.PI/3;
  this.r3    = this.side/Math.sin(this.beta3);
  this.h3    = this.r3*cos(this.beta3);
  this.w     = 2*this.h12;
  this.h     = this.h12+(this.h3+this.r3)+this.side;

  this.buildCell = function(x, y) {
    var sides = this.sides;
    var p;
    p = build_poly(x,y,this.r,this.sides);
    this.polys.push(p);

    var d3 = this.h12+this.h3;
    var D3A = p5.Vector.fromAngle(Math.PI*0.5);
    D3A.setMag(d3);
    p = build_poly(x+D3A.x,y+D3A.y,this.r3,3,this.beta3*0.5);
    this.polys.push(p);

    var D3B = p5.Vector.fromAngle(2*this.beta);
    D3B.setMag(d3);
    p = build_poly(x+D3B.x,y+D3B.y,this.r3,3,-this.beta*2);
    this.polys.push(p);
  }

  // http://www.redblobgames.com/grids/hexagons/
  this.buildGrid = function() {
    var h = this.h;
    var w = this.w;
    var inc = h
    // TODO: get dimensions from somewhere
    var dim =500;
    var row = 0;
    for (var y = -h / 2; y < dim + h/2; y += inc) {
      var startX = ((row % 2) == 0) ? -w : -w / 2;
      for (var x = startX; x < dim; x += w) {
        this.buildCell(x, y);
      }
      row++;
    }

  }

}
