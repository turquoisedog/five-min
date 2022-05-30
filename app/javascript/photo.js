export class Photo {
    constructor(domObject) {
        this.domObject = domObject
        this.innerImage = this.domObject.firstElementChild
        this.sgid = domObject.dataset.sgid
        this.selected = false
    }

    select() {
        this.selected = true
        this.innerImage.classList.add("selected")
    }

    deselect() {
        this.selected = false
        this.innerImage.classList.remove("selected")
    }

    static deselectAll(photos) {
        photos.forEach(function(photo) {
            photo.deselect()
        })

        photos.length = 0
    }
}