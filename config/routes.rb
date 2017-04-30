Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/' => 'index#index'
  resources :index, only: [:index]
  resources :sessions, only: [:create]
end
