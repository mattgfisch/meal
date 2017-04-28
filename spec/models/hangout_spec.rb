require 'rails_helper'

RSpec.describe Hangout, type: :model do
  describe "associations" do
    let (:admin){User.create(name: "Admin", email: "admin@admin.com", password: "password")}
    let (:creator){User.create(name: "Creator", email: "creator@creator.com", password: "password")}
    let (:member){User.create(name: "Member", email: "member@member.com", password: "password")}
    let (:group){Group.new(name: "Test")}
    let (:hangout){Hangout.new()}
    let (:loc1){Location.create(latitude: 12.3324234, longitude: 12.2343234)}
    let (:loc2){Location.create(latitude: 12.3324234, longitude: 12.2343234)}

    before(:each) do
      admin.created_groups << group
      group.save
      group.members << admin
      group.members << creator
      group.members << member

      creator.created_hangouts << hangout
      group.hangouts << hangout
      hangout.save

      hangout.members << creator

      hangout.locations << loc1
      hangout.locations << loc2
    end

    context "Hangout" do
      it "has members" do
        expect(hangout.members).to all be_a User
      end

      it "has a creator" do
        expect(hangout.creator.name).to eq "Creator"
      end

      it "belongs to a group" do
        expect(hangout.group.name).to eq "Test"
      end

      it "has locations" do
        expect(hangout.locations).to all be_a Location
      end
    end
  end
end
