import { Controller } from "@hotwired/stimulus"
import { put } from "@rails/request.js"
import TomSelect from "tom-select"
import { Photo } from "../photo"

// noinspection JSDeprecatedSymbols,JSUnresolvedVariable
export default class extends Controller {
  static targets = [ "toggler", "gallery", "groupSelector" ]

  connect() {
    this.selecting = false
    this.selectedPhotos = []

    Array.from(
        document.getElementsByClassName("photo")
    ).forEach(domObject => {
      this.selectedPhotos.push(new Photo(domObject))
    }, this)
  }

  toggleSelecting() {
    if (this.selecting) {
      this.selecting = false

      this.galleryTarget.classList.remove("selecting")
      Photo.deselectAll(this.selectedPhotos)

      this.togglerTarget.classList.remove("btn-secondary")
      this.togglerTarget.classList.add("btn-outline-primary")
      this.togglerTarget.innerHTML = "Select"
    } else {
      this.selecting = true

      this.galleryTarget.classList.add("selecting")

      this.togglerTarget.classList.remove("btn-outline-primary")
      this.togglerTarget.classList.add("btn-secondary")
      this.togglerTarget.innerHTML = "Cancel"
    }
  }

  toggleSelect() {
    let photo = this.selectedPhotos.find( ({ sgid }) => sgid === event.currentTarget.dataset.sgid )

    if (this.selecting) {
      event.preventDefault()

      if (!photo.selected) {
        photo.select()
      } else {
        photo.deselect()
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

  groupSelectorTargetConnected(target) {
    new TomSelect("#group-selector", {
      create: true
    })
  }
}
