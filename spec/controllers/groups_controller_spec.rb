require 'rails_helper'

RSpec.describe GroupsController, type: :controller do
  describe 'post group add members' do
    let!(:user) { User.create!(name: 'Josh', email: 'email@email.com', password: 'password') }
    let!(:group) { Group.create!(name: 'dog', admin: user) }
    let!(:user2) { User.create!(name: 'austin', email: 'austin@austin.com', password: 'password') }


    it 'responds with status code 200' do
      get :add_members, params: {id: group.id, currentEmail: "austin@austin.com"}
      expect(response).to have_http_status 200
    end
  end
end
