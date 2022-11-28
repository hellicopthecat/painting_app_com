
const saveBtn = document.getElementById("savedata")
const textInput = document.getElementById("text");
const imgFile = document.getElementById("img-file");
const modeBtn = document.getElementById("mode-btn");
const eraseAllBtn = document.getElementById("eraseAll-btn")
const eraseSection = document.getElementById("eraseSection-btn")

const colorOption = Array.from(
    document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event) {
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
    isPainting = true;
}

function cancelPainting () {
    ctx.beginPath();
    isPainting = false;
}
function onLineWidthChange (event) {
    ctx.lineWidth = event.target.value ;
}

function onColorChange (event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick (event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue
}

function onModeClick() {
    if(isFilling){
        isFilling = false
        modeBtn.innerText = "Fill"
    } else {
        isFilling = true
        modeBtn.innerText = "Draw"
    }
}

function onCanvasClick () {
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onEraseClick () {
    alert("Are y sure?")
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraseSectionClick (){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        imgFile.value = null;
    }
}

function onDoubleClick (evnet) {
    const text = textInput.value;
    if(text !== "") {
        ctx.save();    
        ctx.lineWidth = 1;
        ctx.font = "48px serif";
        ctx.fillText(text,event.offsetX, evnet.offsetY);
        ctx.restore();
    }
}

function onSaveBtn() {
    const url = canvas.toDataURL();
    const a = document.createElement("a")
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}



canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOption.forEach(color => color.addEventListener("click", onColorClick))

modeBtn.addEventListener("click", onModeClick);
eraseAllBtn.addEventListener("click", onEraseClick)
eraseSection.addEventListener("click", onEraseSectionClick)

imgFile.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveBtn);