// change sideCount to the # of poly sides desired
//
var sideCount = 10;

var canvas;
var ctx;
var PI2 = Math.PI * 2;
var cx = window.innerWidth / 3;
var cy = window.innerHeight / 6;
var end_x = 87.5;
var end_y = 54.5;
var radius = window.innerWidth / 2;
var end_radius = 7.5;
var percent = 0;
var percentDirection = 0.5;

var xx = function(a) {
  return (cx - (percent / 100) * (cx - end_x) + (end_radius + (radius - end_radius) * (1 - percent / 100)) * Math.cos(a));
}
var yy = function(a) {
  return (cy - (percent / 100) * (cy - end_y) + (end_radius + (radius - end_radius) * (1 - percent / 100)) * Math.sin(a));
}
var lerp = function(a, b, x) {
  return (a + x * (b - a));
}

var sides = [];

function pushSides() {
  sides = []
  for (var i = 0; i < sideCount; i++) {
    sides.push(makeSide(i, sideCount));
  }
}


// functions
var intervalID;

function startAnime() {
  intervalID = setInterval(animate, 10);
}

function animate() {
  percent += percentDirection;
  if (percent > 100)
    percent = 100;
  if (percent < 0)
    percent = 0;
  if (percent == 100 || percent == 0)
    clearTimeout(intervalID);
  pushSides();
  drawSides(percent);
}

function drawSides(pct, color) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (pct == 100) {
    ctx.beginPath();
    ctx.arc(end_x, end_y, end_radius, 0, PI2);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(sides[0].x0, sides[0].y0);
    for (var i = 0; i < sideCount; i++) {
      var side = sides[i];
      var cpx = lerp(side.midX, side.cpX, pct / 100);
      var cpy = lerp(side.midY, side.cpY, pct / 100);
      ctx.quadraticCurveTo(cpx, cpy, side.x2, side.y2);
    }
    ctx.fill();
  }
}

function makeSide(n, sideCount) {
  var sweep = PI2 / sideCount;
  var sAngle = sweep * (n - 1);
  var eAngle = sweep * n;

  var x0 = xx(sAngle);
  var y0 = yy(sAngle);
  var x1 = xx((eAngle + sAngle) / 2);
  var y1 = yy((eAngle + sAngle) / 2);
  var x2 = xx(eAngle);
  var y2 = yy(eAngle);

  var midX = (x2 + x0) / 2;
  var midY = (y2 + y0) / 2;
  var cpX = 2 * x1 - x0 / 2 - x2 / 2;
  var cpY = 2 * y1 - y0 / 2 - y2 / 2;

  return ({
    x0: x0,
    y0: y0,
    x2: x2,
    y2: y2,
    midX: midX,
    midY: midY,
    cpX: cpX,
    cpY: cpY
  });
}

$("document").ready(function() {
  canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  ctx.fillStyle = "#566746";
  pushSides();
  drawSides(percent);
});