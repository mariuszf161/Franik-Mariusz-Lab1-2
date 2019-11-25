document.addEventListener('DOMContentLoaded', appStart)

let canvas;
let ctx;
let brushStyle;
let mouseDown;

function appStart(){
    canvas = document.querySelector('#canvas')
    ctx = canvas.getContext('2d')
    document
        .querySelector('#darken')
        .addEventListener('click', () => darkenFilter())
    document
        .querySelector('#lighten')
        .addEventListener('click', () => lightenFilter())
    document
        .querySelector('#blur')
        .addEventListener('click', () => blurFilter())
    document
        .querySelector('#negative')
        .addEventListener('click', () => negativeFilter())
    document
        .querySelector('#square')
        .addEventListener('click', () => {
            painting()
            brushSquare()
        })
    document
        .querySelector('#circle')
        .addEventListener('click', () => {
            painting()
            brushCircle()
    })
    document
        .querySelector('#green')
        .addEventListener('click', () => {
            green()
        })
    document
        .querySelector('#blue')
        .addEventListener('click', () => {
            blue()
        })
    document
        .querySelector('#red')
        .addEventListener('click', () => {
            red()
        })
    document
        .querySelector('#yellow')
        .addEventListener('click', () => {
            yellow()
        })

    drawImage()
}

function drawImage() {
    const image = new Image()
    image.src = './img/zdjecie.jpg'
    image.addEventListener('load', () => {
        ctx.drawImage(image, 0, 0)
    })
}
function darkenFilter(amount = 20) {
    const canvasData = ctx.getImageData(0, 0, 500, 500)
    for (let i = 0; i < canvasData.data.length; i += 4) {
        canvasData.data[i] -= amount
        canvasData.data[i + 1] -= amount
        canvasData.data[i + 2] -= amount
    }
    ctx.putImageData(canvasData, 0, 0)
}
function lightenFilter(amount = 20) {
    const canvasData = ctx.getImageData(0, 0, 500, 500)
    for (let i = 0; i < canvasData.data.length; i += 4) {
        canvasData.data[i] -= amount
        canvasData.data[i + 1] -= amount
        canvasData.data[i + 2] -= amount
        canvasData.data[i + 3] -= amount
    }
    ctx.putImageData(canvasData, 0, 0)
}
function blurFilter() {
    const canvasData = ctx.getImageData(0, 0, 500, 500)
    for (let i = 0; i < canvasData.data.length; i += 3) {
        canvasData.data[i] = (canvasData.data[i] + canvasData.data[i + 4]) / 2
        canvasData.data[i + 1] = (canvasData.data[i + 1] + canvasData.data[i + 5]) / 2
        canvasData.data[i + 2] = (canvasData.data[i + 2] + canvasData.data[i + 6]) / 2
    }
    ctx.putImageData(canvasData, 0, 0)
}
function negativeFilter(amount = 20) {
    const canvasData = ctx.getImageData(0, 0, 500, 500)
    for (let i = 0; i < canvasData.data.length; i += 4) {
        canvasData.data[i] = 255
        canvasData.data[i + 1] = 255 - canvasData.data[i + 1]
        canvasData.data[i + 2] = 255 - canvasData.data[i + 2] /2
        canvasData.data[i + 3] = 255 - canvasData.data[i + 3] /2
        canvasData.data[i + 4] = 255 - canvasData.data[i + 4] /2
    }
    ctx.putImageData(canvasData, 0, 0)
}

function painting() {
    canvas.addEventListener('mousedown', down)
    canvas.addEventListener('mouseup', toggledrawer)
    canvas.addEventListener('mousemove',
        function (e) {
            let mosuePos = getMousePos(canvas, e)
            let posx = mosuePos.x
            let posy = mosuePos.y
            let brushStyle = "square"
            draw(canvas, posx, posy, brushStyle)
        })

    function down() {
        mouseDown = true
    }

    function toggledrawer() {
        mouseDown = false
    }

    function getMousePos(canvas, e) {
        let rect = canvas.getBoundingClientRect()
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    function draw(canvas, posx, posy) {
        let context = canvas.getContext('2d')

        if (mouseDown) {
            if (brushStyle == "square") {
                context.fillRect(posx, posy, 15, 15)
                context.fillStyle = brushColor
            } else if (brushStyle == "circle") {
                context.beginPath()
                context.arc(posx, posy, 8, 0, 2 * Math.PI)
                context.fill()
                context.fillStyle = brushColor
            }
        }
    }
}

function brushCircle() {
    brushStyle = "circle"
}

function brushSquare() {
    brushStyle = "square"
}

function green() {
    brushColor = 'green'
}

function blue() {
    brushColor = 'blue'
}

function red() {
    brushColor = 'red'
}

function yellow() {
    brushColor = 'yellow'
}


