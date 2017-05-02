Rails.application.routes.draw do
  root 'index#index'
  resources :index, only: [:index]
  resource :users
  resource :sessions
  resources :groups, except: [:index]
  resource :hangouts, except: [:show]
  resource :locations

  post '/groups/:id/members', to: 'groups#add_members'
  get '/groups', to: 'groups#joined_groups'
  get '/hangouts', to: 'hangouts#current_hangouts'
  get '/admin_groups', to: 'groups#admin_groups'
  delete '/sessions/:id', to: 'sessions#destroy'
end
