import { Controller } from "@hotwired/stimulus"
import { put } from "@rails/request.js"
import TomSelect from "tom-select"
import { Photo } from "../photo"

// noinspection JSDeprecatedSymbols,JSUnresolvedVariable
export default class extends Controller {
  static targets = [ "toggler", "gallery", "groupSelector" ]

  connect() {
    this.selecting = false
    this.photos = []
    this.anchor = null

    Array.from(
        document.getElementsByClassName("photo")
    ).forEach(domObject => {
      this.photos.push(new Photo(domObject))
    }, this)
  }

  toggleSelecting() {
    if (this.selecting) {
      this.galleryTarget.classList.remove("selecting")

      Photo.deselectAll(this.photos)

      this.togglerTarget.classList.remove("btn-secondary")
      this.togglerTarget.classList.add("btn-outline-primary")
      this.togglerTarget.innerHTML = "Select"

      this.anchor = null
    } else {
      this.galleryTarget.classList.add("selecting")

      this.togglerTarget.classList.remove("btn-outline-primary")
      this.togglerTarget.classList.add("btn-secondary")
      this.togglerTarget.innerHTML = "Cancel"
    }

    this.selecting = !this.selecting
  }

  toggleSelect() {
    let photo = this.photos.find( ({ sgid }) => sgid === event.currentTarget.dataset.sgid )

    if (this.selecting) {
      event.preventDefault()

      if (!this.anchor) {
        this.anchor = photo
      } else if (event.shiftKey) {
        let first = this.photos.indexOf(photo)
        let last = this.photos.indexOf(this.anchor)

        this.photos.slice(Math.min(first, last), Math.max(first, last)).forEach(photo => {
          photo.select()
        })
      }

      photo.toggle()
    }
  }

  async updateGroups() {
    const response = await put("/photos", {
      body: JSON.stringify({
        selected_photos: Photo.getSelected(this.photos),
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
