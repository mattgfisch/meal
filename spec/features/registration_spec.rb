require 'rails_helper'

describe 'RegistrationForm' do
  feature 'Navigates Registration Form', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    it ' Shows the Form' do
      visit '/'
      click_on 'Register'
      expect(page).to have_content 'New Account'
    end

    it 'is able to click on the Register button, not Register' do
      visit '/'
      click_on 'Register'
      fill_in 'Full Name', with: 'Tester Name'
      fill_in 'Password', with: 'password'
      click_on 'Register'
      expect(page).to have_content "Email can't be blank"
    end

    it 'is able to click on the Register button, not Register' do
      visit '/'
      click_on 'Register'
      fill_in 'Full Name', with: 'Tester Name'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Register'
      expect(page).to have_content "Email has already been taken"
    end

    it 'is able to fill the Register form, Register and render the user show page' do
      visit '/'
      click_on 'Register'
      fill_in 'Full Name', with: 'Tester Name'
      fill_in 'Email', with: 'tester23@test.com'
      fill_in 'Password', with: 'password'
      click_on 'Register'
      expect(page).to have_content('Your Meals')
    end



  end
end
