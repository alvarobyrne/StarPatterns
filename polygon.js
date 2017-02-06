// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video: https://youtu.be/sJ6pMLp_IaI
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

function Polygon(x,y,sides,r) {
  this.center = createVector(x,y);
  this.vertices = [];
  this.edges = [];
  this.sides = sides;
  this.radius = r;

  this.addVertex = function(x, y) {
    var a = createVector(x, y);
    var total = this.vertices.length;
    if (total > 0) {
      var prev = this.vertices[total - 1];
      this._add_vertex(prev, a);
    }
    this.vertices.push(a);
  }

  this.close = function() {
    var total = this.vertices.length;
    var last = this.vertices[total - 1];
    var first = this.vertices[0];
    this._add_vertex(last, first);
  }
  this._add_vertex=function(current, next){
    var edge = new Edge(current, next);
    this.edges.push(edge);

  }
  this.hankin = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin(this);
    }

    for (var i = 0; i < this.edges.length; i++) {
      for (var j = 0; j < this.edges.length; j++) {
        if (i !== j) {
          this.edges[i].findEnds(this.edges[j],this);
        }
      }
    }
  }

  this.show = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].show();
    }
  }

}
