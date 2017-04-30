require 'rails_helper'

describe 'UserShow' do
  feature 'Navigates Home Page', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    it 'Shows home page after logging in' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      expect(find('.col-xs-10').find('h2')).to have_content('Your Meals')
    end

    it 'Shows log in page if not logged in ' do
      visit '/'
      fill_in 'Email', with: 'mattymoo'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      expect(find('ul')).to have_content 'Email or Password incorrect'
      visit '/'
      expect(page).to have_content 'Log In'
    end
    
    it 'Shows home page on refresh if logged in' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      visit '/'
      expect(page).to have_content 'Your Meals'
    end
  end
end
