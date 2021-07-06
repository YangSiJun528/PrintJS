const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const plus = document.getElementById("jsPlus");
const minus = document.getElementById("jsMinus");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const canvas_XY_btn = document.getElementById("canvas_XY_btn");
let canvas_X = document.getElementById('canvas_X');

const INITIAL_COLOR = "#2c2c2c"; //초기 색

//처음 나오는 검은색이랑 선 굵기가 선언된 것과 다르게 나와서 onload써서 해결 함

let canvas_width_size = 800;
let canvas_height_size = 800;

canvas.width = 800;
canvas.height = 800;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

//마우스가 움직일 떄 실행되는 콜백 함수
function onMouseMove(event) { 
  const x = event.offsetX; // 이벤트가 일어나는 좌표
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); 
    ctx.moveTo(x, y); 
  } else {
    ctx.lineTo(x, y); 
    ctx.stroke();
  }
}

//색상 클릭했을 때 실행되는 콜백 함수
function handleColorClick(event) { 
  let colors = document.querySelectorAll('.jsColor');
  const color = event.target.style.backgroundColor;
  colors.forEach((color) => {
    color.classList.remove('active');
    color.classList.add('inactive');
});
  event.target.classList.remove('inactive');
  event.target.classList.add('active');
  ctx.strokeStyle = color;
  console.log(color);
  ctx.fillStyle = ctx.strokeStyle;
}
//선 굵기 증가
function plusThickness() { 
  if (ctx.lineWidth < 15) {
    ctx.lineWidth += 1;
  }
  resizeThickness();
}

//선 굵기 증가
function minusThickness() { 
  if (ctx.lineWidth > 1) {
    ctx.lineWidth -= 1;
  }
  resizeThickness();
}

//모드 클릭 했을때 아이콘 바꾸는 함수
function handleModeClick() { 
  if (filling === true) {
    filling = false;
    mode.innerHTML = '<i class="fas fa-paint-brush"></i>';
  } else {
    filling = true;
    mode.innerHTML = '<i class="fas fa-fill-drip"></i>';
  }
}

//채우기
function handleCanvasClick() { 
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

//오른쪽 클릭 안되게 하는 함수
function handleCM(event) { 
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

// 추가 기능 : 컨버스 사이즈 번경
function resizeCanvas()  {
  let canvas_X = document.getElementById('canvas_X').value;
  let canvas_Y = document.getElementById('canvas_Y').value;
  canvas_X = parseInt(canvas_X);
  canvas_Y = parseInt(canvas_Y);
  if((canvas_Y||canvas_X)==NaN){
    alert("숫자만 입력 할 수 있습니다");
  }else{
    console.log(canvas_X,canvas_Y);
    canvas.width = canvas_X;
    canvas.height = canvas_Y;
    canvas.style.width = `${canvas_X}px`;
    canvas.style.height = `${canvas_Y}px`;
  }
}

// 추가 기능 : 선 두께 알려주기
function resizeThickness() {
  let Thickness = document.getElementById('jsThickness');
  Thickness.innerText = `Thickness : ${ctx.lineWidth}`;
}

window.onload = function(){
  let Thickness = document.getElementById('jsThickness');
  Thickness.innerText = `Thickness : ${ctx.lineWidth}`;
  ctx.fillStyle = "white";  //
  ctx.fillRect(0, 0, canvas.width, canvas.height); //배경색 하얀색으로
  ctx.strokeStyle = INITIAL_COLOR; //그리기 색
  ctx.fillStyle = INITIAL_COLOR; //채우기 색
  }

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if (plus) {
  plus.addEventListener("click", plusThickness);
}

if (minus) {
  minus.addEventListener("click", minusThickness);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
if (canvas_XY_btn) {
  canvas_XY_btn.addEventListener("click", resizeCanvas);
}