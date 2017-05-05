require 'rails_helper'

describe 'GroupShow' do
  feature 'Admin of Hangout can Lock Hangout', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:creator) { User.create!(name: 'Max', email: 'max@max.com', password: 'password')}
    let!(:group) { Group.create!(name: "Test", admin_id: user.id) }

    def find_and_click(text)
      page.find("a", :text => /\A#{text}\z/).click
    end

    before(:each) do
      group.members << creator
      group.members << user

      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'

      click_link('Test', match: :first)
      click_on 'Options'
      find_and_click('Create Hangout')
      sleep 5
    end

    it "Hangout admin can lock hangout" do
      click_on 'Options'
      find_and_click('Lock Hangout')
      click_on 'Options'
      expect(page).to have_content('Hangout Locked')
    end

    it "can't join hangout when locked" do
      click_on 'Options'
      find_and_click('Lock Hangout')

      click_on 'Logout'

      fill_in 'Email', with: 'max@max.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      click_link('Test', match: :first)
      click_on 'Options'
      expect(page).to have_content('Hangout Locked')
    end

  end
end
