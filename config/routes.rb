Rails.application.routes.draw do
  resources :groups
  resources :photos, except: [:new] do
    collection do
      get 'manage'
    end
  end

  root "photos#index"
end
