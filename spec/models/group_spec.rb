require 'rails_helper'

RSpec.describe Group, type: :model do
  describe "associations" do
    let (:admin){User.create(name: "Admin", email: "admin@admin.com", password: "password")}
    let (:creator){User.create(name: "Creator", email: "creator@creator.com", password: "password")}
    let (:member){User.create(name: "Member", email: "member@member.com", password: "password")}
    let (:group){Group.new(name: "Test")}
    let (:hangout){Hangout.new()}

    before(:each) do
      admin.created_groups << group
      group.save
      group.members << admin
      group.members << creator
      group.members << member

      creator.created_hangouts << hangout
      group.hangouts << hangout
      hangout.save
    end

    context "Group" do
      it "has a name" do
        expect(group.name).to eq "Test"
      end

      it "has an admin" do
        expect(group.admin).to be_a User
      end

      it "has members" do
        expect(group.members).to all be_a User
      end

      it "has a hangout" do
        expect(group.hangouts).to all be_a Hangout
      end
    end
  end
end
