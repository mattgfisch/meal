Rails.application.routes.draw do
  root 'index#index'
  resources :index, only: [:index]
  resources :users, only: [:create]
  resources :sessions, only: [:create, :destroy]
  resources :groups, only: [:show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
