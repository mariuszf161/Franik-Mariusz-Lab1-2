class Note {
    constructor(title, message, color, pinBT) {
        this.title = title
        this.message = message
        this.color = color
        this.pinBT = pinBT
        let data = new Date()
        let date = data.toLocaleDateString()
        let time = data.toLocaleTimeString()
        this.currentdate = date + ' ' + time
    }
    addToLocalStorage(note) {
        localStorage.setItem(localStorage, JSON.stringify(note));
    }

}
