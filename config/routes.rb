Rails.application.routes.draw do
  resources :groups
  resources :photos
  resource :photos, only: [:update]

  root "photos#index"
end
