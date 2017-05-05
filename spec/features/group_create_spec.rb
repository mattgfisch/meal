require 'rails_helper'

describe 'GroupCreate' do
  feature 'Creates a group', js: true do
    let!(:user1) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
    let!(:batman) { User.create!(name: 'Clark Ent', email: 'batman@batman.com', password: 'password') }
    let!(:wonderwoman) { User.create!(name: 'Brew Swayne', email: 'wonder@wo.man', password: 'password') }
    let!(:superman) { User.create!(name: 'Peter Parkour', email: 'souper@man.clark', password: 'password') }

    before(:each) do
      visit '/'
      fill_in 'Email', with: user1.email
      fill_in 'Password', with: 'password'
      click_on 'Log In'
      click_on '+'
    end

    it 'Shows the Form' do
      expect(page).to have_content 'Create Group Name'
    end

    it 'is able enter valid information' do
      fill_in 'groupName', with: 'Grouptastic'
      fill_in 'email', with: batman.email
      click_on 'Invite User'
      click_on 'Create Group'
      expect(page).to have_content "Members #{user1.name} #{batman.name}"
    end

    it 'invalid information returns error(s)' do
      click_on 'Create Group'
      expect(page).to have_content "Group name can't be blank"
    end

    it "Can't use nonexistant email addresses" do
      fill_in 'groupName', with: 'CAFFEE'
      fill_in 'email', with: 'lbdllbbdlaaa'
      click_on 'Invite User'
      fill_in 'email', with: batman.email
      click_on 'Invite User'
      click_on 'Create Group'
      expect(page).to have_content 'Invalid email(s)'
    end

    it 'Cannot invite self to group' do
      fill_in 'groupName', with: 'self love'
      fill_in 'email', with: user1.email
      click_on 'Invite User'
      click_on 'Create Group'
      expect(page).to have_content 'Invalid email(s)'
    end

    it 'filters out blank emails' do
      fill_in 'groupName', with: 'Fantastic Foreach'
      2.times { click_on 'Invite User' }
      click_on 'Create Group'
      expect(page).to have_content 'Members'
    end

    it 'can invite multiple users' do
      fill_in 'groupName', with: 'Justiss Leeg'
      fill_in 'email', with: batman.email
      sleep 1
      click_on 'Invite User'
      fill_in 'email', with: wonderwoman.email
      sleep 1

      click_on 'Invite User'
      fill_in 'email', with: superman.email
      sleep 1
      
      click_on 'Invite User'
      click_on 'Create Group'
      expect(page).to have_content "#{batman.name} #{wonderwoman.name} #{superman.name}"
    end
  end
end
