require 'rails_helper'

describe 'ShowActiveMembers' do
  feature 'Show icon next to active members', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:creator) { User.create!(name: 'Max', email: 'max@max.com', password: 'password')}
    let!(:group) { Group.create!(name: "Test", admin_id: user.id) }
    let!(:hangout) {Hangout.create!(group_id: group.id, creator_id: creator.id)}

    before(:each) do
      Capybara.ignore_hidden_elements = false
      group.members << creator
      group.members << user
      hangout.members << user

      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'

      click_link('Test', match: :first)
    end

    it "shows icon next to active user" do
      user_div = page.find("div", :text => /\AMatt\z/)
      expect(user_div).to have_selector("button")
    end

    it "doesn't show icon next to non-active user" do
      user_div = page.find("div", :text => /\AMax\z/)
      expect(user_div).to_not have_selector("button")
    end

  end
end
