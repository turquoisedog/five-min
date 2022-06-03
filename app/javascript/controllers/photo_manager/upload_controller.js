import { Controller } from "@hotwired/stimulus"
import hotkeys from "hotkeys-js"

// Connects to data-controller="photo-manager--upload"
// noinspection JSDeprecatedSymbols,JSUnresolvedVariable
export default class extends Controller {
  static targets = [ "uploadForm" ]

  connect() {
    this.uploadModal = new bootstrap.Modal("#uploadModal")

    hotkeys("n", () => {
      this.uploadModal.show()
    })
  }

  uploadFormTargetConnected() {
    document.addEventListener("hidden.bs.modal", () => {
      this.reset()
    })
  }

  reset() {
    this.uploadFormTarget.reset()
    this.uploadModal.hide()
  }
}
