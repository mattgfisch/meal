require 'rails_helper'

describe 'RegistrationForm' do
  feature 'Navigates Registration Form', js: true do
    it ' Shows the Form' do
      visit '/'
      expect(page).to have_content 'Register'
    end
    it 'is able to click on the register button, not register' do
      visit '/'
      fill_in 'Full Name', with: 'Tester Name'
      fill_in 'Password', with: 'password'
      click_on 'Register'
     expect(find('h2')).to have_content "Register For Meal"
    end
    it 'is able to fill the register form, register and render the user show page' do
      visit '/'
      fill_in 'Full Name', with: 'Tester Name'
      fill_in 'Email', with: 'tester23@test.com'
      fill_in 'Password', with: 'password'
      click_on 'Register'
      # expect(find('.col-xs-10').find('h1')).to have_content('Meal')
    end

  end
end
