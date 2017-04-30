require 'rails_helper'

describe 'NavBar' do
  feature 'Navigates NavBar', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    it ' Shows the NavBar' do
      visit '/'
      expect(page).to have_content 'Meals'
    end

    it 'is able to navigate to log in' do
      visit '/'
      click_on 'Meals'
      expect(page).to have_content 'Log In'
    end

    it 'is able to navigate to log in from registration' do
      visit '/'
      click_on 'register'
      click_on 'Meals'
      expect(page).to have_content('Log In')
    end

    it 'logout is shown when successfully logged in' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      expect(page).to have_content('Logout')
    end

    it 'Meals link navigates to users show page when successfully logged in' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      click_on 'Meals'
      expect(find('.col-xs-10').find('h2')).to have_content('Your Meals')
    end

    it 'Log out successfully ends a session and pulls up Log in page' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      click_on 'Logout'
      expect(page).to have_content('Log In')
    end

    it 'is able to fill the register form, register, become logged in and see their home page' do
      visit '/'
      click_on 'register'
      fill_in 'Full Name', with: 'Tester Name'
      fill_in 'Email', with: 'tester23@test.com'
      fill_in 'Password', with: 'password'
      click_on 'Register'
      expect(page).to have_content('Tester')
    end

  end
end
