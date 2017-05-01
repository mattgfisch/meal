require 'rails_helper'

describe 'GroupCreate' do
  feature 'Creates a group', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    it ' Shows the Form' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      click_on '+'
      expect(page).to have_content ""
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

      expect(find('.col-xs-10').find('h2')).to have_content('Your Meals')
    end
  end
end
