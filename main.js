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

let canvas_width_size = 800;
let canvas_height_size = 800;

ctx.fillStyle = "white";  //채우기 색상
ctx.fillRect(0, 0, canvas.width, canvas.height); //색이 있는 사각형을 그림
ctx.strokeStyle = INITIAL_COLOR; //그리기 색
ctx.fillStyle = INITIAL_COLOR; //채우기 색
ctx.lineWidth = 3; //줄 두께

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

function onMouseMove(event) {  //마우스가 움직일 떄 실행되는 콜백 함수
  const x = event.offsetX; // 이벤트가 일어나는 좌표
  const y = event.offsetY;
  if (!painting) { //그리고 있는 중이 아니면
    ctx.beginPath(); //그리기 시작
    ctx.moveTo(x, y); //x,y 좌표로 이동
  } else {
    ctx.lineTo(x, y); //x,y 좌표로 이동
    ctx.stroke(); //그리기
  }
}

function handleColorClick(event) { //색상 클릭했을 때 실행되는 콜백 함수
  const color = event.target.style.backgroundColor; // 클릭된 div 배경 값 가져오기
  ctx.strokeStyle = color;  //그리기 색상 지정
  console.log(color);
  ctx.fillStyle = ctx.color; //채우기
}

function plusThickness() { //그림 두께 늘리기
  if (ctx.lineWidth < 15) {
    ctx.lineWidth += 1.5;
  }
  resizeThickness();
}

function minusThickness() { //그림 두께 줄이기
  if (ctx.lineWidth > 3) {
    ctx.lineWidth -= 1.5;
  }
  resizeThickness();
}

function handleModeClick() { //모드 클릭 했을때 아이콘 바꾸는 함수
  if (filling === true) {
    filling = false;
    mode.innerHTML = '<i class="fas fa-paint-brush"></i>';
  } else {
    filling = true;
    mode.innerHTML = '<i class="fas fa-fill-drip"></i>';
  }
}

function handleCanvasClick() { //채우기
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

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