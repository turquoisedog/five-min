import { Controller } from "@hotwired/stimulus"
import { post, put } from "@rails/request.js"
import TomSelect from "tom-select"
import { Photo } from "../photo"
import pluralize from "pluralize"

// noinspection JSDeprecatedSymbols,JSUnresolvedVariable
export default class extends Controller {
  static targets = [ "toggler", "gallery", "groupSelector", "groupButton" ]

  connect() {
    this.selecting = false
    this.photos = []
    this.anchor = null

    document.addEventListener("selectionToggled", event => {
      this.groupButtonTarget.disabled = Photo.getSelected(this.photos).length <= 0;
    })

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
    this.selectionToggled()
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
      this.selectionToggled()
    }
  }

  selectionToggled() {
    this.groupButtonTarget.disabled = Photo.getSelected(this.photos).length <= 0;
  }

  async updateGroups() {
    let selectedPhotos = Photo.getSelected(this.photos)
    let selectedGroups = [...this.groupSelectorTarget.options]
        .filter(option => option.selected)
        .map(option => option.value)

    await put("/photos", {
      body: JSON.stringify({
        selected_photos: selectedPhotos,
        selected_groups: selectedGroups
      }),
      responseKind: "json"
    }).then(response => response.json).then(body => {
      let photos = pluralize("photo", body.photos_updated, true)
      let groups = pluralize("group", body.photos_updated, true)

      this.showToast(
          "text-bg-success",
          `Added ${photos} to ${groups}.`
      )
      this.toggleSelecting()
      this.groupSelector.clear()
    })
  }

  groupSelectorTargetConnected(target) {
    this.groupSelector = new TomSelect(target, {
      create: async (input, callback) => {
        await post("/groups", {
          body: JSON.stringify({
            name: input
          }),
          responseKind: "json"
        }).then(response => response.json).then(body => {
          return callback({ value: body.sgid, text: body.name })
        })
      }
    })
  }

  showToast(className, text) {
    let toastContainer = document.querySelector("#toastContainer")
    let toastEl = document.querySelector("#toastTemplate")
        .content.firstElementChild.cloneNode(true)
    let toast = new bootstrap.Toast(toastEl)

    toastEl.classList.add(className)
    toastEl.querySelector(".toast-body").innerHTML = text

    toastContainer.appendChild(toastEl)
    toast.show()
  }
}
