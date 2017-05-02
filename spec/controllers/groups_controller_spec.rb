require 'rails_helper'

RSpec.describe GroupsController, type: :controller do
    describe 'GET groups/:id' do
      let!(:user) { User.create!(name: "Matt", email: "matt@matt.com", password: 'password') }
      let!(:group) { Group.create!(name: 'Grouptastic', admin_id: user.id) }

      before(:each) do
        controller.session[:user_id] = user.id
        get :show, :id => group.id
      end

      it 'Group does not have any hangouts' do
        expect(assigns(:hangout_id)).to be nil
      end
    end
end
