Rails.application.routes.draw do
  root 'index#index'
  resources :index, only: [:index]
  resource :users
  resource :sessions
  resources :groups, except: [:index]
  resource :hangouts, except: [:show, :create, :update]
  resource :locations

  post '/groups/:id/members', to: 'groups#add_members'
  get '/groups', to: 'groups#joined_groups'
  get '/hangouts', to: 'hangouts#current_hangouts'
  get '/admin_groups', to: 'groups#admin_groups'
  delete '/sessions/:id', to: 'sessions#destroy'
  patch '/groups/:group_id/hangouts/:id', to: 'hangouts#update'
  post '/groups/:group_id/hangouts', to: 'hangouts#create'
  put '/groups/:group_id/hangouts/:id/leave', to: 'hangouts#leave'
  delete '/groups/:group_id/hangouts/:id/delete', to: 'hangouts#delete'
  put '/groups/:group_id/hangouts/:id/lock', to: 'hangouts#lock'
end
