Rails.application.routes.draw do
  resources :groups
  resources :photos

  root "photos#index"
end
