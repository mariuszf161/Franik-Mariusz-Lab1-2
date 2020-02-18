let list = []
let addNoteBtn = document.querySelector('#addNoteBtn')
let notes = document.querySelector('#notes')
let pinBT = document.querySelector('#pinBT')
addNoteBtn.addEventListener('click', addNote)
window.onload = function () {
    if (localStorage.getItem('notatkiLS') != null) {
        getFromLocalStorage()
        createBox()
    }
}

function addNote() {
    let check
    if (pinBT.checked == true) {
        check = true
    } else {
        check = false
    }

    list.push(new Note(title.value, message.value, color.value, check))

    pushToLocalStorage()
    createBox()

}

function pushToLocalStorage() {
    localStorage.setItem('notatkiLS', JSON.stringify(list))
    getFromLocalStorage()
}

function getFromLocalStorage() {
    list = JSON.parse(localStorage.getItem('notatkiLS'))
}

function createBox() {
    notes.innerHTML = ''
    list.forEach(element => {

        let container = document.createElement('div')
        let title = document.createElement('div')
        title.innerText = element.title
        let message = document.createElement('div')
        message.innerText = element.message
        let time = document.createElement('div')
        time.innerText = element.currentdate
        container.style.backgroundColor = element.color
        container.className = 'container'
        container.appendChild(title)
        title.className = 'title'
        container.appendChild(message)
        container.appendChild(time)
        time.className = 'time'
        container.className = 'container'
        if (element.pinBT == true) {
            notes.prepend(container)
        } else {
            notes.appendChild(container)
        }
    })
}