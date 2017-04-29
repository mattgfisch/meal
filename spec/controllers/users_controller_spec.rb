require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'post users' do
    let!(:user) { User.create!(name: 'Josh', email: 'email@email.com', password: 'password') }
    it 'responds with status code 200' do
      expect(response).to have_http_status 200
    end

    it 'creates a new user' do

      expect(User.first.name).to eq 'Josh'
    end

  end
end
