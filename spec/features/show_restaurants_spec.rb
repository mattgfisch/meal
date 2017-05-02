# require 'rails_helper'
#
# describe 'Showing restaurants', js: true do
#   let!(:user) { User.create!(name: 'Matt', email: 'matt@matt.com', password: 'password') }
#   let!(:group1) { Group.create!(name: 'Grouptastic', admin_id: user.id) }
#
#   before(:each) do
#     group1.members << user
#     visit '/'
#     fill_in 'Email', with: user.email
#     fill_in 'Password', with: 'password'
#     click_on 'Log In'
#     button = page.find('.joined-link', match: :first)
#     button.click
#   end
#
#   feature 'Create hangout' do
#     it "shows user is hanging out" do
#       click_on 'Create Hangout'
#       wait_for_ajax
#       visit '/'
#       button = page.find('.joined-link', match: :first)
#       button.click
#       expect(page).to have_content 'HANGING OUT'
#     end
#
#     it 'Populates the Restaurants element' do
#       click_on 'Create Hangout'
#       within(:css, "p.restaurants") do
#         expect(page).to have_css('p')
#       end
#     end
#   end
# end
