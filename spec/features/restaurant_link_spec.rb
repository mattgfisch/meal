require 'rails_helper'

describe 'RestaurantLink' do
  feature 'View Restaurant Information', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:group) { Group.create!(name: "Tha Best", admin_id: user.id)}
    let!(:hangout) {Hangout.create!(group_id: group.id, creator_id: user.id)}
    let!(:location) {Location.new(latitude: 47.6, longitude: -122.33)}
    before(:each) do
      # Stub data
      group.members << user
      hangout.members << user
      hangout.locations << location
      location.save
      # Navigate to Group Show
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      button = page.find('.joined-link', match: :first)
      button.click
    end

    it "takes you to Google Maps page of restaurant" do
      # Click on link for a restaurant
      click_on 'Elysian Fields'
      expect(page).to have_content "Directions"
    end
  end
end
