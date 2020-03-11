document.body.addEventListener('keypress', playSounds)

let channel1Record
let channel2Record
let channel3Record
let channel4Record

const channel1list = []
const channel2list = []
const channel3list = []
const channel4list = []

document.querySelector('#channel1R')
    .addEventListener('click', recordChannel1)

document.querySelector('#channel2R')
    .addEventListener('click', recordChannel2)

document.querySelector('#channel3R')
    .addEventListener('click', recordChannel3)

document.querySelector('#channel4R')
    .addEventListener('click', recordChannel4)

document.querySelector('#channel1P')
    .addEventListener('click', playChannel1)

document.querySelector('#channel2P')
    .addEventListener('click', playChannel2)

document.querySelector('#channel3P')
    .addEventListener('click', playChannel3)

document.querySelector('#channel4P')
    .addEventListener('click', playChannel4)

const sounds = {
    KeyQ: "#boom",
    KeyW: "#clap",
    KeyE: "#hihat",
    KeyA: "#kick",
    KeyS: "#openhat",
    KeyD: "#ride",
    KeyZ: "#snare",
    KeyX: "#tink",
    KeyC: "#tom",
}

let onChannel1 = -1

function recordChannel1() {
    channel1Record = Date.now()
    onChannel1 = 0
}

function recordChannel2() {
    channel2Record = Date.now()
    onChannel1 = 1
}

function recordChannel3() {
    channel3Record = Date.now()
    onChannel1 = 2
}

function recordChannel4() {
    channel4Record = Date.now()
    onChannel1 = 3
}

function playChannel1() {
    StopPlay()
    channel1list.forEach((el) => {
        setTimeout(() => {
            playSound(sounds[el.sound])
        }, el.time)
    })
}

function playChannel2() {
    StopPlay()
    channel2list.forEach((el) => {
        setTimeout(() => {
            playSound(sounds[el.sound])
        }, el.time)
    })
}

function playChannel3() {
    StopPlay()
    channel3list.forEach((el) => {
        setTimeout(() => {
            playSound(sounds[el.sound])
        }, el.time)
    })
}

function playChannel4() {
    StopPlay()
    channel4list.forEach((el) => {
        setTimeout(() => {
            playSound(sounds[el.sound])
        }, el.time)
    })
}

function playSounds(e) {
    playSound(sounds[e.code])
    if (onChannel1 === -1) {
        return
    }
    if (onChannel1 === 0) {
        const time = Date.now() - channel1Record
        const sound = {
            sound: e.code,
            time: time
        }
        channel1list.push(sound)
    }
    if (onChannel1 === 1) {
        const time = Date.now() - channel2Record
        const sound = {
            sound: e.code,
            time: time
        }
        channel2list.push(sound)
    }
    if (onChannel1 === 2) {
        const time = Date.now() - channel3Record
        const sound = {
            sound: e.code,
            time: time
        }
        channel3list.push(sound)
    }
    if (onChannel1 === 3) {
        const time = Date.now() - channel4Record
        const sound = {
            sound: e.code,
            time: time
        }
        channel4list.push(sound)
    }
}
function StopPlay() {
    onChannel1 = -1
}

function playSound(id) {
    const audioTag = document.querySelector(id)
    audioTag.currentTime = 0
    audioTag.play()
}