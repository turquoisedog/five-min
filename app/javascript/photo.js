export class Photo {
    constructor(domObject) {
        this.domObject = domObject
        this.innerImage = this.domObject.firstElementChild
        this.sgid = domObject.dataset.sgid
        this.selected = false
    }

    toggle() {
        if (this.selected) {
            this.deselect()
        } else {
            this.select()
        }
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
    }

    static getSelected(photos) {
        return photos.filter(photo => photo.selected).map(photo => { return photo.sgid })
    }
}