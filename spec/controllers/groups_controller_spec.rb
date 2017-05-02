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
end
