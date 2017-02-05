function SquareOctagonTiling(r) {
  this.r     = r;
  this.polys = [];
  this.sides = 4;
  this.beta  = Math.PI/this.sides;
  this.side  = this.r* Math.sin(this.beta);
  this.h4    = this.r* Math.cos(this.beta);
  this.r8    = this.side/Math.sin(Math.PI/8);
  this.h8    = this.r8*Math.cos(Math.PI/8);
  this.h     = this.h8+this.h4;
  this.w     = 2*(this.h8+this.h4);


  this.buildCell = function(x, y) {
    var sides = this.sides;
    console.log("sides : ",sides);
    var p;
    p = build_poly(x,y,this.r,this.sides);
    this.polys.push(p);
    var d8 = this.h4+this.h8;
    var D8 = p5.Vector.fromAngle(0);
    D8.setMag(d8);
    p = build_poly(x+D8.x,y+D8.y,this.r8,8);
    this.polys.push(p);
  }

  // http://www.redblobgames.com/grids/hexagons/
  this.buildGrid = function() {

    var h = this.h;
    var w = this.w;
    var inc = h;
    // TODO: get dimensions from somewhere
    var row = 0;
    for (var y = -h / 2; y < 400 + h/2; y += inc) {
      var startX = ((row % 2) == 0) ? -w : -w / 2;
      for (var x = startX; x < 400; x += w) {
        this.buildCell(x, y);
      }
      row++;
    }

  }

}
