require 'rails_helper'

describe 'GroupShow' do
  feature 'Admin of Hangout can Lock Hangout', js: true do
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
      click_on 'Create Hangout'
    end

    it "Hangout admin can lock hangout" do
      sleep 3
      click_on 'Lock Hangout'
      expect(page).to have_content('Hangout Locked')
    end

    it "can't join hangout when locked" do
      click_on 'Lock Hangout'
      click_on 'Logout'
        fill_in 'Email', with: 'max@max.com'
        fill_in 'Password', with: 'password'
        click_on 'Log In'
        click_link('Test', match: :first)
        expect(page).to have_content('Hangout Locked')
    end

  end
end
