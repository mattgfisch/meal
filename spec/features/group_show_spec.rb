require 'rails_helper'

describe 'GroupShow' do
  feature 'GroupShow', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:new_user) { User.create!(name: 'Jack', email: 'jack@jack.com', password: 'password') }
    let!(:group) {Group.create!(name: 'Test', admin_id: user.id)}
    let!(:group2) {Group.create!(name: 'Test2', admin_id: user.id)}
    let!(:group3) {Group.create!(name: 'Test3', admin_id: user.id)}
    let!(:hangout) {Hangout.create!(creator_id: user.id, group_id: group.id)}

    before(:each) do
      group.members << user
      group2.members << user
      group3.members << user
      hangout.members << user
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
    end

    it 'Can click on created groups and have page show' do
      click_link('created', :match => :first)
      expect(page).to have_content('Members')
    end
    it 'Can click on joined groups and have page show' do
      link = page.find('.joined-link', match: :first)
      link.click
      expect(page).to have_content('Members')
    end

    it 'Can navigate back to user show page from group show' do
      link = page.find('.joined-link', match: :first)
      link.click
      click_on('Meals')
      expect(page).to have_content('Your Meals')
    end
  end
end
