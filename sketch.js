// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video: https://youtu.be/sJ6pMLp_IaI
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

// var poly;
var polys = [];

var angle = 30;
var delta = 0;

var deltaSlider;
var angleSlider;
var tilingTypeSelect;
var gridCheck;

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('canvasContainer');

  // angleMode(DEGREES);
  background(51);
  deltaSlider = select('#delta');
  angleSlider = select('#angle');
  tilingTypeSelect = select('#tiling');
  tilingTypeSelect.changed(chooseTiling);
  gridCheck = select('#showGrid');
  chooseTiling();
}

function draw() {
  background(50);
  angle = angleSlider.value();
  delta = deltaSlider.value();
  for (var i = 0; i < polys.length; i++) {
    polys[i].hankin();
    polys[i].show();
  }
}

function hexTiling() {
  var hexTiles = new HexagonalTiling(50);
  hexTiles.buildGrid();
  polys = hexTiles.polys;
}
function hexTriangleSquareTiling() {
  var tiles = new HexaTriangleSquareTiling(50);
  tiles.buildGrid();
  polys = tiles.polys;
}
function squareOctagonTiling() {
  var tiles = new SquareOctagonTiling(50);
  tiles.buildGrid();
  polys = tiles.polys;
}
function triangleSquareTiling() {
  var tiles = new TriangleSquareTiling(50);
  tiles.buildGrid();
  polys = tiles.polys;
}

function squareTiling() {
  var square = new SquareTiling(50);
  square.buildGrid();
  polys = square.polys;
}
/*
function squareTiling() {
  polys = [];
  var inc = 100;
  for (var x = 0; x < width; x += inc) {
    for (var y = 0; y < height; y += inc) {
      var poly = new Polygon();
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }
}
*/
function dodecaHexSquareTiling(){
  var tiles = new DodecaHexaSquareTiling(50);
  tiles.buildGrid();
  polys = tiles.polys;

}
function dodecaTriangleTiling(){
  var tiles = new DodecaTriangleTiling(70);
  tiles.buildGrid();
  polys = tiles.polys;
}
function hexaTriangleTiling(){
  var tiles = new HexaTriangleTiling(70);
  tiles.buildGrid();
  polys = tiles.polys;
}
function hexaTriangleTiling2(){
  var tiles = new HexaTriangleTiling2(70);
  tiles.buildGrid();
  polys = tiles.polys;
}
function squareTriangleTiling(){
  var tiles = new SquareTriangleTiling(70);
  tiles.buildGrid();
  polys = tiles.polys;
}

function chooseTiling() {
  switch (tilingTypeSelect.value()) {
    case "square":
      squareTiling();
      break;
    case "hexagonal":
      hexTiling();
      break;
    case "dodeca_hex_square":
      dodecaHexSquareTiling();
      break;
    case "hexa_triangle_square":
      // dodecaHexSquareTiling();
      hexTriangleSquareTiling();
      break;
    case "square_octagon":
      // dodecaHexSquareTiling();
      squareOctagonTiling();
      break;
    case "triangle_square":
      // dodecaHexSquareTiling();
      triangleSquareTiling();
      break;
    case "dodeca_triangle":
      dodecaTriangleTiling();
      break;
    case "hexa_triangle":
      hexaTriangleTiling();
      break;
    case "hexa_triangle2":
      hexaTriangleTiling2();
      break;
    case "square_triangle":
      squareTriangleTiling();
      break;
    default:
      hexaTriangleTiling2();
      // hexTiling();
      // squareTriangleTiling();
      // dodecaTriangleTiling();
      // triangleSquareTiling();
      // squareOctagonTiling();
      // hexTriangleSquareTiling();
      // dodecaHexSquareTiling();
      // squareTiling();
      break;
  }
}
function build_poly(x,y,r,sides,init_angle) {
    var p = new Polygon();
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
