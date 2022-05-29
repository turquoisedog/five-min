import { Controller } from "@hotwired/stimulus"
import { put } from "@rails/request.js"
import TomSelect from "tom-select"

// rubymine i love you but stimulus puts ruby magic into js it's nuts
// noinspection JSDeprecatedSymbols,JSUnresolvedVariable
export default class extends Controller {
  static values = {
    selectionMode: Boolean,
    selectedPhotos: Array
  }
  static targets = [ "galleryContainer", "groupSelector" ]
  static classes = [ "selecting", "selected" ]

  toggleSelectionMode() {
    if (this.selectionModeValue) {
      this.selectionModeValue = false

      this.galleryContainerTarget.classList.remove(this.selectingClass)
      this.deselectAll()

      event.currentTarget.classList.remove("btn-secondary")
      event.currentTarget.classList.add("btn-outline-primary")
      event.currentTarget.innerHTML = "Select"
    } else {
      this.selectionModeValue = true

      this.galleryContainerTarget.classList.add(this.selectingClass)

      event.currentTarget.classList.remove("btn-outline-primary")
      event.currentTarget.classList.add("btn-secondary")
      event.currentTarget.innerHTML = "Cancel"
    }
  }

  select() {
    if (this.selectionModeValue) {
      event.preventDefault()

      if (!event.target.classList.contains(this.selectedClass)) {
        event.target.classList.add(this.selectedClass)

        // add the selected photo's GlobalID to the array
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
    const response = await put("/photos", {
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

  groupSelectorTargetConnected(target) {
    new TomSelect("#group-selector", {
      create: true
    })
  }
}
