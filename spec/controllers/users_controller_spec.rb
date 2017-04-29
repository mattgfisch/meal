require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'post users' do
    it 'responds with status code 200' do
      expect(response).to have_http_status 200
    end
    it 'creates a new session' do
      controller.session[:user_id] = user.id
      get 'users'
      expect(@users.size).to eq(1)
    end
  end
end
