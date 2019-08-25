let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let canvas_helper = document.getElementById("canvas_helper");
let context_helper = canvas_helper.getContext("2d");

let color = document.getElementById("value_color");
let size = document.getElementById("value_size");

let pencilTools = document.getElementsByClassName('pencil_tools');
let pencilSquare = document.getElementById('pencil_square');
let pencilCircle = document.getElementById('pencil_circle');

let arcTools = document.getElementsByClassName('arc_tools')
let arcStroke = document.getElementById('arcStroke');
let arcFill = document.getElementById('arcFill');
let valueArcType = "arcFill";

let rectTools = document.getElementsByClassName('rect_tools')
let rectFill = document.getElementById('rectFill');
let rectStroke = document.getElementById('rectStroke');
let valueRectType = 'rectFill';

let toolbar2 = document.getElementsByClassName('toolbar_2');

let pencil = document.getElementById('pencil');
let arc = document.getElementById('arc');

let rect = document.getElementById('rect');
let line = document.getElementById('line');

let buttonList = [pencil, arc, rect, line];

let buttonArcList = [arcStroke, arcFill];
let buttonRectList = [rectFill, rectStroke];

let toolsList = [rectTools[0], arcTools[0], pencilTools[0]];

let clearButton = document.getElementById("clear");

let valueColor = color.value;
let valueSize = size.value;
let valueType = 'pencil';
let valuePencilType = 'pencilSquare';

document.getElementById('change_size').innerHTML = valueSize;
color.addEventListener('change', changeColor);
size.addEventListener('change', changeSize);

let isPaint = false;

let xStart = 0;
let yStart = 0;


toolbar2[0].addEventListener('click', (e) => {
  let value;
  if (!e.target.id) {
    if ((e.target).closest('button')) {
      value = (e.target).closest('button').id;
    } else return
  } else {
    value = e.target.id
  }
  activeButton(value);
  showToolsOptions(value);
  valueType = value;
})

function showToolsOptions(value) {
  for (let i = 0; i < toolsList.length; i++) {
    toolsList[i].classList.remove("showBlock");
    toolsList[i].classList.add("hideBlock");
  }
  if (value === 'pencil') {
    pencilTools[0].classList.add("showBlock");
    pencilTools[0].classList.remove("hideBlock");
  }
  if (value === 'arc') {
    arcTools[0].classList.add("showBlock");
    arcTools[0].classList.remove("hideBlock");
  }
  if (value === 'rect') {
    rectTools[0].classList.add("showBlock");
    rectTools[0].classList.remove("hideBlock");
  }
}

pencilSquare.addEventListener('click', (e) => {
  valuePencilType = 'pencilSquare';
  activeButtonPencilTools('pencilSquare');
})

pencilCircle.addEventListener('click', (e) => {
  valuePencilType = 'pencilCircle';
  activeButtonPencilTools('pencilCircle');
})

arcStroke.addEventListener('click', (e) => {
  valueArcType = 'arcStroke';
  activeButtonTools(buttonArcList, 'arcStroke');
})

arcFill.addEventListener('click', (e) => {
  valueArcType = 'arcFill';
  activeButtonTools(buttonArcList, 'arcFill');
})

rectFill.addEventListener('click', (e) => {
  valueRectType = 'rectFill';
  activeButtonTools(buttonRectList, 'rectFill');
})

rectStroke.addEventListener('click', (e) => {
  valueRectType = 'rectStroke';
  activeButtonTools(buttonRectList, 'rectStroke');
})

function activeButtonTools(list, button) {
  for (let i = 0; i < list.length; i++) {
    list[i].classList.remove("activeButton");
    if (list[i].id === button) {
      list[i].classList.add("activeButton");
    }
  }
}

function activeButtonPencilTools(button) {
  switch (button) {
    case 'pencilSquare':
      pencilSquare.classList.add("activeButton");
      pencilCircle.classList.remove("activeButton");
      line.classList.remove("activeButton")
      break;
    case 'pencilCircle':
      pencilSquare.classList.remove("activeButton");
      pencilCircle.classList.add("activeButton");
      line.classList.remove("activeButton")
      break;
  }
}

function activeButton(button) {
  for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].classList.remove("activeButton");
    if (buttonList[i].id === button) {
      buttonList[i].classList.add("activeButton");
    }
  }
}

function changeType(type) {
  valueType = type;
}

function clearFieldHelper() {
  context_helper.clearRect(0, 0, 1000, 600)
}

clearButton.addEventListener('click', clearField)

canvas.addEventListener('mousedown', (event) => {
  isPaint = true;
  startPoint(event);
  switch (valueType) {
    case 'line':
      canvas.addEventListener('mousemove', (e) => {
        if (isPaint) {
          visualization(e);
        }
      })
      canvas.addEventListener('mouseup', (e) => {
        paintLine(e);
        isPaint = false;
      })

      break;
    case 'pencil':
      canvas.addEventListener('mousemove', (event) => {
        paint(event)
      })
      canvas.addEventListener('mouseup', () => {
        isPaint = false;
        context.closePath();
      })
      break;
    case 'arc':
      canvas.addEventListener('mousemove', (e) => {
        if (isPaint) {
          visualization(e);
        }
      })
      canvas.addEventListener('mouseup', (e) => {
        paintArc(e);
        isPaint = false;
      })
      break;
    case 'rect':
      canvas.addEventListener('mousemove', (e) => {
        if (isPaint) {
          visualization(e);
        }
      })
      canvas.addEventListener('mouseup', (e) => {
        paintRect(e);
        isPaint = false;
      })
      break;
  }
});

function paintArc(e) {
  context.lineWidth = valueSize;
  context.fillStyle = valueColor;
  context.strokeStyle = valueColor;
  if (valueType === "arc") {
    clearFieldHelper();
    if (valueArcType === "arcFill") {
      context.beginPath();
      let xEnd = e.offsetX;
      let yEnd = e.offsetY;
      let r = ((xEnd - xStart) ** 2 + (yEnd - yStart) ** 2) ** (1 / 2);
      context.arc(xStart, yStart, r, 0, Math.PI * 2, true);
      context.fill();
    }
    if (valueArcType === "arcStroke") {
      context.beginPath();
      let xEnd = e.offsetX;
      let yEnd = e.offsetY;
      let r = ((xEnd - xStart) ** 2 + (yEnd - yStart) ** 2) ** (1 / 2);
      context.arc(xStart, yStart, r, 0, Math.PI * 2, true);
      context.stroke();
    }
  }
}

function visualization(e) {
  let x = e.offsetX;
  let y = e.offsetY;
  context_helper.strokeStyle = valueColor;
  context_helper.lineWidth = valueSize;

  if (valueType === "line") {
    clearFieldHelper();
    context_helper.lineWidth = valueSize;
    context_helper.beginPath();
    context_helper.moveTo(xStart, yStart);
    context_helper.lineTo(x, y);
    context_helper.stroke();
    context_helper.closePath();
  }
  if (valueType === "arc") {
    clearFieldHelper();
    context_helper.fillStyle = valueColor;
    context_helper.beginPath();
    let r = ((x - xStart) ** 2 + (y - yStart) ** 2) ** (1 / 2);
    context_helper.arc(xStart, yStart, r, 0, Math.PI * 2, true);
    if (valueArcType === "arcStroke") {
      context_helper.stroke();
    } else {
      context_helper.fill();
    }
    context_helper.closePath();
  }
  if (valueType === "rect") {
    clearFieldHelper();
    let xEnd = event.offsetX;
    let yEnd = event.offsetY;
    let x = null;
    let y = null;
    let a = null;
    let b = null;
    context_helper.beginPath();
    context_helper.fillStyle = valueColor;
    context_helper.strokeStyle = valueColor;
    context.lineWidth = valueSize;
    if (yStart < y && xStart < x) {
      x = xStart;
      y = yStart;
      a = (xEnd - xStart);
      b = (yEnd - yStart);
    }
    if (yStart < y && xStart > x) {
      x = xEnd;
      y = yStart;
      a = (xStart - xEnd);
      b = (yEnd - yStart);
    }
    if (yStart > y && xStart > x) {
      x = xEnd;
      y = yEnd;
      a = (xStart - xEnd);
      b = (yStart - yEnd);
    }
    if (yStart < y && xStart > x) {
      x = xStart;
      y = yEnd;
      a = (xEnd - xStart);
      b = (yStart - yEnd);
    }

    if (valueRectType === 'rectStroke') {
      context_helper.rect(x, y, a, b);
      context_helper.stroke();
    }
    if (valueRectType === 'rectFill') {
      context_helper.fillRect(x, y, a, b);
    }
  }
}

function startPoint(event) {
  xStart = event.offsetX;
  yStart = event.offsetY;
}

function paintLine(e) {
  if (valueType === 'line') {
    clearFieldHelper();
    context.strokeStyle = valueColor;
    context.lineWidth = valueSize;
    context.beginPath();
    context.moveTo(xStart, yStart);
    let xEnd = e.offsetX;
    let yEnd = e.offsetY;
    context.lineTo(xEnd, yEnd);
    context.stroke();
    context.closePath();
  }
}

function clearField() {
  clearFieldHelper();
  context.clearRect(0, 0, 1000, 600);
}

function changeColor() {
  valueColor = color.value;
}

function changeSize() {
  valueSize = size.value;
  document.getElementById('change_size').innerHTML = valueSize;
}

function paint(event) {
  if (isPaint && valueType === 'pencil') {
    let x = event.offsetX;
    let y = event.offsetY;
    context.beginPath();
    context.fillStyle = valueColor;
    if (valuePencilType === 'pencilSquare') {
      context.fillRect(x - (valueSize / 2), y - (valueSize / 2), valueSize, valueSize);
    }
    if (valuePencilType === 'pencilCircle') {
      context.arc(x, y, valueSize / 2, 0, Math.PI * 2, true);
      context.fill();
    }
  }
}

function paintRect(e) {
  if (valueType === 'rect') {
    let xEnd = event.offsetX;
    let yEnd = event.offsetY;
    let x = null;
    let y = null;
    let a = null;
    let b = null;
    context.beginPath();
    context.fillStyle = valueColor;
    context.strokeStyle = valueColor;
    context.lineWidth = valueSize;
    if (yStart < y && xStart < x) {
      x = xStart;
      y = yStart;
      a = (xEnd - xStart);
      b = (yEnd - yStart);
    }
    if (yStart < y && xStart > x) {
      x = xEnd;
      y = yStart;
      a = (xStart - xEnd);
      b = (yEnd - yStart);
    }
    if (yStart > y && xStart > x) {
      x = xEnd;
      y = yEnd;
      a = (xStart - xEnd);
      b = (yStart - yEnd);
    }
    if (yStart < y && xStart > x) {
      x = xStart;
      y = yEnd;
      a = (xEnd - xStart);
      b = (yStart - yEnd);
    }

    if (valueRectType === 'rectStroke') {
      context.rect(x, y, a, b);
      context.stroke();
    }
    if (valueRectType === 'rectFill') {
      context.fillRect(x, y, a, b);
    }
    context.closePath()
  }
}
