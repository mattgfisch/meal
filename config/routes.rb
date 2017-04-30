Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'users#show'
  resource :users
  resource :sessions
  resource :groups, except: [:show]
  resource :hangouts, except: [:show]
  resource :locations

  get '/groups', to: 'groups#joined_groups'
  get '/hangouts', to: 'hangouts#current_hangouts'
  get '/admin_groups', to: 'groups#admin_groups'

end
