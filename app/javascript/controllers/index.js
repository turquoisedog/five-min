// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import GalleryController from "./gallery_controller.js"
application.register("gallery", GalleryController)

import PhotoManager__KeyboardModalController from "./photo_manager/keyboard_modal_controller.js"
application.register("photo-manager--keyboard-modal", PhotoManager__KeyboardModalController)

import PhotoManager__UploadController from "./photo_manager/upload_controller.js"
application.register("photo-manager--upload", PhotoManager__UploadController)
