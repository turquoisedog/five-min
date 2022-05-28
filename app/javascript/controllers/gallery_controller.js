import { Controller } from "@hotwired/stimulus"
import { put } from "@rails/request.js"

// rubymine i love you but stimulus puts ruby magic into js it's nuts
// noinspection JSDeprecatedSymbols,JSUnresolvedVariable
export default class extends Controller {
  static values = {
    selectionMode: Boolean,
    selectedPhotos: Array
  }
  static targets = [ "galleryContainer" ]
  static classes = [ "selecting", "selected" ]

  toggleSelectionMode() {
    if (this.selectionModeValue) {
      this.selectionModeValue = false
      this.galleryContainerTarget.classList.remove(this.selectingClass)
      this.deselectAll()
    } else {
      this.selectionModeValue = true
      this.galleryContainerTarget.classList.add(this.selectingClass)
    }
  }

  select() {
    if (this.selectionModeValue) {
      event.preventDefault()

      if (!event.target.classList.contains(this.selectedClass)) {
        event.target.classList.add(this.selectedClass)
        this.selectedPhotosValue = this.selectedPhotosValue.concat(
            event.currentTarget.dataset.sgid
        )
      } else {
        event.target.classList.remove(this.selectedClass)
        this.selectedPhotosValue = this.selectedPhotosValue.filter(
            id => id !== event.currentTarget.dataset.sgid
        )
      }
    }
  }

  async updateGroups() {
    const response = await put('/photos', {
      body: JSON.stringify({
        selected_photos: this.selectedPhotosValue,
        group_id: 3
      }),
      responseKind: "json"
    })
  }

  deselectAll() {
    let classProxy = this.selectedClass; // ugh scopes

    [...document.getElementsByClassName(this.selectedClass)].forEach(function(photo) {
      photo.classList.remove(classProxy)
    })

    this.selectedPhotosValue = []
  }
}
