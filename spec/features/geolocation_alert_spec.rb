require 'rails_helper'

describe 'Showing restaurants', js: true do
  let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
  let!(:group1) { Group.create!(name: 'Grouptastic', admin_id: user.id) }

  feature 'Display warning' do
    it "Displays if location services are unavailable" do
      group1.members << user

      visit '/'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'password'
      click_on 'Log In'

      button = page.find('.joined-link', match: :first)
      button.click
      click_on 'Create Hangout'
      sleep 2
      expect(page).to have_content 'Warning'
    end
  end
end
