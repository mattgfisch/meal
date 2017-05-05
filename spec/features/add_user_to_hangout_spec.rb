require 'rails_helper'

describe 'GroupShow' do
  feature 'Add User to Hangout', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:creator) { User.create!(name: 'Max', email: 'max@max.com', password: 'password')}
    let!(:group) { Group.create!(name: "Test", admin_id: user.id) }


    before(:each) do
      group.members << creator
      group.members << user

      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'

      click_link('Test', match: :first)
    end

    it 'adds user to existing hangout' do
      Hangout.create!(group_id: group.id, creator_id: creator.id)
      click_on 'Options'
      page.find("a", :text => /\ACreate Hangout\z/).click
      expect(page).not_to have_content('Delete Hangout')
    end
  end
end
