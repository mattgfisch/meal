require 'rails_helper'

describe 'LoginForm' do
  feature 'Navigates Login Form', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    it ' Shows the Form' do
      visit '/'
      expect(page).to have_content 'Log In'
    end

    it 'is able enter incorrect information and receive errors' do
      visit '/'
      fill_in 'Email', with: 'mattymoo'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      expect(find('ul')).to have_content 'Email or Password incorrect'
    end

    it 'is able to log in with correct information' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      expect(page).to have_content('Your Meals')
    end
  end
end
