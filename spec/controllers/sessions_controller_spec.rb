require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe 'post session' do
    let!(:user) { User.create!(name: 'Josh', email: 'email@email.com', password: 'password') }
    it 'responds with status code 201' do
      get :create, user: {email: user.email, password: user.password}
      expect(response).to have_http_status 201
    end
    it 'raises AlreadyLoggedInError if a session already exist' do
      controller.session[:user_id] = user.id
      expect { get :create }.to raise_error
    end

    it 'raises UnauthorizedError if a user doesnt exist' do
      expect { get :create }.to raise_error
    end

    it 'creates a new session' do
      get :create, user: { email: user.email, password: user.password }
      expect(session[:user_id]).not_to be nil
    end

    it 'destroys a session' do
      delete :destroy, :id => 1
      expect(session[:user_id]).to be nil
    end
  end
end
