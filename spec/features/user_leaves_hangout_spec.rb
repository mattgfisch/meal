require 'rails_helper'

describe 'GroupShow' do
  feature 'User can leave Hangout', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:creator) { User.create!(name: 'Max', email: 'max@max.com', password: 'password')}
    let!(:group) { Group.create!(name: "Test", admin_id: user.id) }
    let!(:hangout) {Hangout.create!(group_id: group.id, creator_id: creator.id)}

    before(:each) do
      group.members << creator
      group.members << user
      hangout.members << user

      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'

      click_link('Test', match: :first)
      click_on 'Options'
    end

    def find_and_click(text)
      page.find("a", :text => /\A#{text}\z/).click
    end

    it "shows leave hangout button" do
      expect(page).to have_content('Leave Hangout')
    end

    it "removes user from hangout and all Restaurants removed" do
      find_and_click('Leave Hangout')
      expect(page).not_to have_content('Restaurants')
    end

    it "removes user from hangout and button goes back to create hangout" do
      find_and_click('Leave Hangout')
      click_on 'Options'
      expect(page).to have_content('Create Hangout')
    end

    it "removes user from hangout and icon next to name is removed" do
      find_and_click('Leave Hangout')
      user_div = page.find("div", :text => /\AMatt\z/)
      expect(user_div).not_to have_selector("button")
    end
  end
end
