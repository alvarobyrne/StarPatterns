//Now this one
function TriangleSquareTiling(r) {
  this.r     = r;
  this.polys = [];
  this.sides = 3;
  this.beta  = Math.PI/this.sides;
  this.side  = this.r* Math.sin(this.beta);
  this.h3    = this.r* Math.cos(this.beta);
  this.r4    = this.side/Math.sin(Math.PI/4);
  this.h4    = this.r4*Math.cos(Math.PI/4);
  this.h     = this.h3+this.r+this.side;
  this.w     = 2*this.h;


  this.buildCell = function(x, y) {
    var a_init;
    a_init = Math.PI*0.5;
    // a_init = 0;
    var sides = this.sides;
    var p;
    p = build_poly(x,y,this.r,this.sides,a_init);
    this.polys.push(p);
    var d4 = this.h4+this.h3;

    var D4A = p5.Vector.fromAngle(a_init-2*this.beta);
    D4A.setMag(d4);
    p = build_poly(x+D4A.x,y+D4A.y,this.r4,4,this.beta);
    this.polys.push(p);


    var D4B = p5.Vector.fromAngle(this.beta*2+a_init);
    D4B.setMag(d4);
    p = build_poly(x+D4B.x,y+D4B.y,this.r4,4,-this.beta);
    this.polys.push(p);

    var D3A = p5.Vector.fromAngle(a_init);
    var d3 = this.h3+this.h3;
    D3A.setMag(d3);
    p = build_poly(x+D3A.x,y+D3A.y,this.r,3,0.5*this.beta);
    this.polys.push(p);

    var D3B;
    D3B = D4A.copy();
    var extra = p5.Vector.fromAngle(-0.5*this.beta+a_init);
    extra.setMag(this.h4+this.h3)
    D3B.add(extra);
    p = build_poly(x+D3B.x,y+D3B.y,this.r,3);
    this.polys.push(p);

    var D3C;
    D3C = D4B.copy();
    var extra = p5.Vector.fromAngle(0.5*this.beta+a_init);
    extra.setMag(this.h4+this.h3)
    D3C.add(extra);
    p = build_poly(x+D3C.x,y+D3C.y,this.r,3,this.beta);
    this.polys.push(p);
  }

  // http://www.redblobgames.com/grids/hexagons/
  this.buildGrid = function() {

    var h = this.h;
    console.log("h : ",h);
    var w = this.w;
    console.log("w : ",w);
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
