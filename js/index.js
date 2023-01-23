const freeHand = document.querySelector('.freeHand');
const drawLine = document.querySelector('.drawLine');
const drawRectangle = document.querySelector('.drawRectangle');
const drawCricle = document.querySelector('.drawCricle');
const eraser = document.querySelector('.eraser');
const canvas = document.getElementById('canvas');
const fill_style = document.getElementById('fill_style');
const stroke_style = document.getElementById('stroke_style');
const ctx = canvas.getContext('2d');
let fill_color = '';
let stroke_color = '';
let freehand_clicked = false;
let line_clicked = false;
let rect_clicked = false;
let circle_clicked = false;
let eraser_clicked = false;
let drawFlag = false;
let EraserFlag = false;
let sp = {x:0,y:0};
let ep = {x:0,y:0};
function resetAll(){
    freehand_clicked = false;
    line_clicked = false;
    rect_clicked = false;
    circle_clicked = false;
    eraser_clicked = false;
    freeHand.classList.remove('buttonSelected');
    drawRectangle.classList.remove('buttonSelected');
    drawCricle.classList.remove('buttonSelected');
    drawLine.classList.remove('buttonSelected');
    eraser.classList.remove('buttonSelected');
}
function startDrawing (e){
    if(freehand_clicked){
        ctx.beginPath();
        sp.x = e.offsetX;
        sp.y = e.offsetY;
        ctx.strokeStyle = `#000000`;
        ctx.moveTo(sp.x,sp.y);
        drawFlag = true;
    }
}
function continueDrawing (e){
    if(drawFlag && freehand_clicked){
        ep.x = e.offsetX
        ep.y = e.offsetY;
        ctx.strokeStyle = `${stroke_color}`;
        ctx.lineWidth = 3;
        ctx.lineTo(ep.x,ep.y);
        ctx.stroke();
        }
}
function endDrawing (e){
    drawFlag = false;
}

function  startStLine(e){
    if(line_clicked){
        ctx.beginPath();
        ctx.moveTo(e.offsetX , e.offsetY);
    }
}
function endStLine(e){
    if(line_clicked){
    ctx.strokeStyle = `${stroke_color}`;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineWidth = 3;
    ctx.stroke();
    }
}

function  startRec(e){
    if(rect_clicked){
        ctx.beginPath();
        sp.x=e.offsetX;
        sp.y=e.offsetY;
        ctx.strokeStyle = `#000000`;
    }
}
function endRec(e){
    if(rect_clicked){
        ctx.beginPath();
        ep.x=e.offsetX;
        ep.y=e.offsetY;
        ctx.fillStyle = `${fill_color}`;
        let width = ep.x - sp.x ;
        let height = ep.y - sp.y;
        ctx.fillRect(sp.x, sp.y, width , height);
        ctx.strokeStyle = `${stroke_color}`;
        ctx.lineWidth   = 2;
        ctx.strokeRect(sp.x, sp.y, width , height);
    }
}

function  startCircle(e){
    if(circle_clicked){
        sp.x=e.offsetX;
        sp.y=e.offsetY;
        ctx.strokeStyle = `#000000`;
    }
}
function endCircle(e){
    if(circle_clicked){
        ctx.beginPath();
        ep.x=e.offsetX;
        let radius = Math.abs(ep.x -sp.x);
        ctx.fillStyle = `${fill_color}`;
        ctx.arc(sp.x, sp.y,radius, 0, 2 * Math.PI); 
        ctx.fill();
        ctx.strokeStyle = `${stroke_color}`;
        ctx.lineWidth   = 2;
        ctx.stroke();
    }
}

function startEraser (e){
    if(eraser_clicked){
        ctx.beginPath();
        sp.x = e.offsetX;
        sp.y = e.offsetY;
        ctx.moveTo(sp.x,sp.y);
        EraserFlag = true;
    }
}
function continueEraser (e){
    if(EraserFlag && eraser_clicked){
        ep.x = e.offsetX
        ep.y = e.offsetY;
        ctx.strokeStyle = `#ffffff`;
        ctx.lineTo(ep.x,ep.y);
        ctx.lineWidth = 30;
        ctx.stroke();
        }
}
function endEraser (e){
    EraserFlag = false;
}

fill_style.addEventListener("change" , (e)=> {
    fill_color=fill_style.value;
})
stroke_style.addEventListener("change" , (e)=> {
   stroke_color=stroke_style.value;
})

freeHand.addEventListener('click', () => {
    resetAll();
    freehand_clicked=!freehand_clicked;
    freeHand.classList.toggle('buttonSelected');
    if(freehand_clicked){
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', continueDrawing);
        canvas.addEventListener('mouseup', endDrawing);
    }else{
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', continueDrawing);
        canvas.addEventListener('mouseup', endDrawing);
    }
   
})

drawLine.addEventListener('click', () => {
    resetAll();
    line_clicked=!line_clicked;
    drawLine.classList.toggle('buttonSelected');
    if(line_clicked){
        canvas.addEventListener('mousedown', startStLine);
        canvas.addEventListener('mouseup', endStLine);
    }else{
        canvas.removeEventListener('mousedown', startStLine);
        canvas.removeEventListener('mouseup', endStLine);
    }
})

drawRectangle.addEventListener('click', () => {
    resetAll();
    rect_clicked=!rect_clicked;
    drawRectangle.classList.toggle('buttonSelected');
    if(rect_clicked){
        canvas.addEventListener('mousedown', startRec);
        canvas.addEventListener('mouseup', endRec);
    }else{
        canvas.removeEventListener('mousedown', startRec);
        canvas.removeEventListener('mouseup', endRec);
    }
})

drawCricle.addEventListener('click', () => {
    resetAll();
    circle_clicked=!circle_clicked;
    drawCricle.classList.toggle('buttonSelected');
    if(circle_clicked){
        canvas.addEventListener('mousedown', startCircle);
        canvas.addEventListener('mouseup', endCircle);
    }else{
        canvas.removeEventListener('mousedown', startCircle);
        canvas.removeEventListener('mouseup', endCircle);
    }
})

eraser.addEventListener('click', () => {
    resetAll();
    eraser_clicked=!eraser_clicked;
    eraser.classList.toggle('buttonSelected');
    if(eraser_clicked){
        canvas.addEventListener('mousedown', startEraser);
        canvas.addEventListener('mousemove', continueEraser);
        canvas.addEventListener('mouseup', endEraser);
    }else{
        canvas.addEventListener('mousedown', startEraser);
        canvas.addEventListener('mousemove', continueEraser);
        canvas.addEventListener('mouseup', endEraser);
    }
})


