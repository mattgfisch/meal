Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'users#show'
  resource :users
  resource :sessions
  resource :groups
  resource :hangouts
  resource :locations

end
