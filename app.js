const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "rgb(19, 19, 19)";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.fillStyle = "white";
context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
context.strokeStyle = INITIAL_COLOR;
context.fillStyle = INITIAL_COLOR;
context.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x, y);
    if(!painting){
        // console.log("creating path in", x, y);
        context.beginPath();
        context.moveTo(x, y);
    } else {
        // console.log("creating line in", x, y);
        context.lineTo(x, y);
        context.stroke();
    }

}

// function onMouseDown(event) {
    // console.log(event);
//     painting = true;
// }

// function onMouseUp(event) {
//     stopPainting()
// }

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    // console.log(color);
    context.strokeStyle = color;
    context.fillStyle = color;
}

function handleRangeChange(event) {
    // console.log(event.target.value);
    const size = event.target.value;
    context.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick() {
    if (filling) {
        context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

// 우클릭 방지
// function handleCM(event) {
//     event.preventDefault();
// }

function handleSaveClick() {
    const image =  canvas.toDataURL("image/png");
    // 디폴트는 PNG
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[💜]";
    // console.log(link);
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    // 우클릭 방지
    // canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}