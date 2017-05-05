require 'rails_helper'

describe 'UserShow' do
  feature 'Navigates Home Page', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:new_user) { User.create!(name: 'Jack', email: 'jack@jack.com', password: 'password') }
    let!(:group) {Group.create!(name: 'Test', admin_id: 1)}
    let!(:hangout) {Hangout.create!(creator_id: 1, group_id: 1)}

    before(:each) do
      group.members << user
      hangout.members << user
    end

    it 'Shows home page after logging in' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      expect(page).to have_content('Your Meals')
    end

    it 'Shows log in page on refresh if not logged in ' do
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

    it 'Shows groups user has created' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      expect(find('#admin-table')).to have_content 'Test'
    end

    it 'Shows groups user has joined' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      expect(find('#joined-groups')).to have_content 'Test'
    end

    it 'Can click on created groups and have page show' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      click_on('created')
      expect(page).to have_content('Members')
    end
    it 'Can click on joined groups and have page show' do
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      link = page.find('.joined-link', match: :first)
      link.click
      expect(page).to have_content('Members')
    end

    it 'Shows no groups if user has not joined any' do
      visit '/'
      fill_in 'Email', with: 'jack@jack.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      expect(find('#joined-groups')).not_to have_content 'Test'
      expect(find('#admin-table')).not_to have_content 'Test'
    end


  end
end
