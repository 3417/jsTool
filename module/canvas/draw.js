let _dom = document.getElementById("draw");
const {width,height} = _dom.getBoundingClientRect();
console.log(_dom.getBoundingClientRect())
function setCanvasBg(){
    let canvas = document.createElement('canvas')
    canvas.id = 'canvas';
    canvas.width = width;
    canvas.height = height;
    _dom.appendChild(canvas);
}
setCanvasBg();
// 可操作的工具
let pen = document.getElementById('pen');
let rubber = document.getElementById('rubber');
let clear = document.getElementById('clear');
let line = document.getElementById('line');
let colorbox = document.getElementById('colorbox');

let color = '#000'
let state = 'paint'
let lineWidth = 3;
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d");

function drawLine(x,y, x2,y2,lineWidth){
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
function cleanDraw(x, y, size){
    ctx.clearRect(x - size / 2, y - size / 2, size, size);
}
_dom.onmousedown=(e)=>{
    ctx.beginPath();
    const {top,left} = _dom.getBoundingClientRect();
    let startPosition = {
        x: e.clientX - left,
        y: e.clientY - top
    }
    _dom.onmousemove=(ev)=>{
        let newPoint = {
            x: ev.clientX - left,
            y: ev.clientY - top
        }
        if(state == 'paint'){
            drawLine(startPosition.x, startPosition.y, newPoint.x, newPoint.y,lineWidth);
        }
        else if(state == 'rubber'){
            cleanDraw(startPosition.x, startPosition.y, 30)
        }
        startPosition = newPoint
    }
    _dom.onmouseup=(e)=>{
        _dom.onmousemove = null
    }
}
pen.onclick = () => {
    state = 'paint'
}
rubber.onclick = () => {
    state = 'rubber'
}
colorbox.onchange = (e) => {
    color = e.target.value
}
clear.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// todo:限制条件还存在点问题
line.oninput = (e)=>{
    if(e.target.value.length>2){
        e.target.value = e.target.value.slice(0,2);
        e.target.value = Number(e.target.value) > 16 ? 16 : e.target.value;
    }
    lineWidth = e.target.value;
}