require 'rails_helper'

describe 'Update Radius' do
  feature 'Updates Dynamically', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:group) { Group.create!(name: 'Test', admin_id: user.id) }
    let!(:hangout) {Hangout.create!(creator_id: user.id, group_id: group.id)}
    let!(:location) {Location.create!(latitude: 47.492372, longitude: -122.325873, hangout_id: 1)}

    before(:each) do
      group.members << user
      hangout.members << user

      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
    end

    it 'Admin can delete a group' do
      click_on "Test", match: :first

      expect(page).to have_selector('p', count: 10)
    end
  end
end
