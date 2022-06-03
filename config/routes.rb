Rails.application.routes.draw do
  resources :groups
  resources :photos do
    collection do
      get 'organize'
    end
  end

  root "photos#index"
end
