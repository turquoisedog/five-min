import { Controller } from "@hotwired/stimulus"
import hotkeys from "hotkeys-js"

// Connects to data-controller="photo-manager--keyboard-modal"
export default class extends Controller {
  connect() {
    let keyboardModal = new bootstrap.Modal("#keyboardReference")

    hotkeys("/", () => {
      keyboardModal.show()
    })
  }
}
