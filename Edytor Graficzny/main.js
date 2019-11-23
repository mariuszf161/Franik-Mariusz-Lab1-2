document.addEventListener('DOMContentLoaded', appStart)

let canvas
let ctx

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



