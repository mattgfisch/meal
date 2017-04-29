require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe 'post session' do
    let!(:user) { User.create!(name: 'Josh', email: 'email@email.com', password: 'password') }
    it 'responds with status code 200' do
      expect(response).to have_http_status 200
    end
    it 'rasies AlreadyLoggedInError if a session already exist' do
      controller.session[:user_id] = user.id
      expect { get :create }.to raise_error
    end

    it 'rasies UnauthorizedError if a user doesnt exist' do
      expect { get :create }.to raise_error
    end

    it 'creates a new session' do
      get :create, user: { email: user.email, password: user.password }
      p session[:user_id]
    end
  end
end
