//Tryning to lay another out but couldn't:
//the one at : https://upload.wikimedia.org/wikipedia/commons/a/a5/1-uniform_10.png
//this just repeats HexagonalTiling behavior.
function HexaTriangleTiling2(r) {
  this.r     = r;
  this.polys = [];
  this.sides = 6;
  this.beta  = Math.PI/this.sides;
  this.h6    = this.r*Math.cos(this.beta);
  this.side  = this.r*Math.sin(this.beta);
  this.w     = this.h6*2;
  this.h     = this.r+this.side;

  this.buildCell = function(x, y) {
    var p = build_poly(x,y,this.r,this.sides) ;
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
