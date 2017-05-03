require 'rails_helper'

describe 'AdminGroupShow' do
  feature 'Admin form on group show', js: true do
    let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:new_user) { User.create!(name: 'Jack', email: 'jack@jack.com', password: 'password') }
    let!(:firstgroup) { Group.create!(name: 'to Delete', admin_id: new_user.id) }
    let!(:group) { Group.create!(name: 'Test', admin_id: user.id) }
    let!(:group2) { Group.create!(name: '1', admin_id: user.id) }
    let!(:group3) { Group.create!(name: '2', admin_id: user.id) }
    let!(:group4) { Group.create(name: '3', admin_id: new_user.id) }
    let!(:hangout) {Hangout.create!(creator_id: user.id, group_id: group.id)}

    before(:each) do
      firstgroup.members << user
      group.members << user
      group2.members << user
      group3.members << user
      group4.members << user
      hangout.members << user
      visit '/'
      fill_in 'Email', with: 'matt@matt.com'
      fill_in 'Password', with: 'password'
      click_on 'Log In'
    end

    it 'Can click on created groups and see add users because we are group admin' do
      click_link('created', :match => :first)
      expect(page).to have_content('Add Users')
    end

    it 'Can click on joined groups and to not have admin features' do
      link = page.find('.joined-link', :match => :first)
      link.click
      expect(page).not_to have_content('Add Users')
    end

    it 'Group admin can invite valid user' do
      click_link('created', :match => :first)
      click_on('Add Users')
      fill_in 'email', with: 'jack@jack.com'
      click_on 'Invite User'
      expect(page).to have_content('Jack')
    end

    it 'Group admin can not invite themselves to group/ anyone already in group' do
      click_link('created', :match => :first)
      click_on('Add Users')
      fill_in 'email', with: 'matt@matt.com'
      click_on 'Invite User'
      expect(page).to have_content('Invalid email')
    end

    it 'Group admin can not invite invaild emails' do
      click_link('created', :match => :first)
      click_on('Add Users')
      fill_in 'email', with: 'weqrdsfasdfdfg'
      click_on 'Invite User'

      expect(page).to have_content('Invalid email')
    end

    it 'Admin can invite valid user after creating a new group' do
      click_on '+'
      fill_in 'groupName', with: 'Grouptastic'
      click_on 'Create Group'
      click_on('Add Users')
      fill_in 'email', with: 'jack@jack.com'
      click_on 'Invite User'
      expect(page).to have_content('Jack')
    end

    it 'Admin can not invite themselves to group/ anyone already in group after creating a new group' do
      click_on '+'
      fill_in 'groupName', with: 'Grouptastic'
      click_on 'Create Group'
      click_on('Add Users')
      fill_in 'email', with: 'matt@matt.com'
      click_on 'Invite User'
      expect(page).to have_content('Invalid email')
    end

    it 'Admin can not invite invaild emails after creating a group' do
      click_on '+'
      fill_in 'groupName', with: 'Grouptastic'
      click_on 'Create Group'
      click_on('Add Users')
      fill_in 'email', with: 'weqrdsfasdfdfg'
      click_on 'Invite User'

      expect(page).to have_content('Invalid email')
    end


  end
end
