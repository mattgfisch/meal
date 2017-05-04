require 'rails_helper'

describe 'GroupShow' do
  feature 'Admin of Hangout', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:creator) { User.create!(name: 'Max', email: 'max@max.com', password: 'password')}
    let!(:group) { Group.create!(name: "Test", admin_id: user.id) }

    def find(text)
      page.find("a", :text => /\A#{text}\z/)
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
      find('Create Hangout').click
      sleep 6
      click_on 'Options'

    end

    it "Hangout admin page shows delete hangout button" do
      expect(page).to have_content('Delete Hangout')
    end

    it "Hangout admin can delete hangout" do
      find('Delete Hangout').click
      expect(page).not_to have_content('Restaurants')
    end

    it "removes user from hangout and button goes back to join hangout" do
      find('Delete Hangout').click
      click_on 'Options'
      expect(page).to have_content('Create Hangout')
    end

    it "removes user from hangout and icon next to name is removed" do
      find('Delete Hangout').click

      user_div = page.find("div", :text => /\AMatt\z/)
      expect(user_div).not_to have_selector("button")
    end

    it "can't see the delete button if not the admin of hangout" do
      click_on 'Logout'
        fill_in 'Email', with: 'max@max.com'
        fill_in 'Password', with: 'password'
        click_on 'Log In'
        click_link('Test', match: :first)
        expect(page).not_to have_content('Delete Hangout')
    end

  end
end
