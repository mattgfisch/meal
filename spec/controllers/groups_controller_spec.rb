require 'rails_helper'

RSpec.describe GroupsController, type: :controller do
  describe 'GET groups/:id' do
    let!(:user) { User.create!(name: "Matt", email: "matt@matt.com", password: 'password') }
    let!(:group) { Group.create!(name: 'Grouptastic', admin_id: user.id) }

    before(:each) do
      controller.session[:user_id] = user.id
    end

    it 'Group does not have any hangouts' do
      get :show, :id => group.id
      expect(assigns(:hangout_id)).to be nil
    end

    xit 'Group gets assigned a hangout' do
      hangout = Hangout.create!(creator_id: user.id, group_id: group.id)
      get :show, :id => group.id
      expect(assigns(:hangout_id)).to eq hangout.id
    end
  end

  describe 'post group add members' do
    let!(:user) { User.create!(name: 'Josh', email: 'email@email.com', password: 'password') }
    let!(:group) { Group.create!(name: 'dog', admin_id: user.id) }
    let!(:user2) { User.create!(name: 'austin', email: 'austin@austin.com', password: 'password') }


    it 'responds with status code 200' do
      get :add_members, params: {id: group.id, currentEmail: "austin@austin.com"}
      expect(response).to have_http_status 200
    end

    it 'responds with status code 422 when failed' do
      get :add_members, params: {id: group.id, currentEmail: "xfghsry"}
      expect(response).to have_http_status 422
    end
  end
end
