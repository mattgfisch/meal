require 'rails_helper'

RSpec.describe User, type: :model do
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
      creator.hangouts << hangout
    end

    context "User" do
      it "has a name" do
        expect(admin.name).to eq "Admin"
      end

      it "has an email" do
        expect(admin.email).to eq "admin@admin.com"
      end

      it "has a password" do
        expect(admin.password).not_to eq nil
      end
    end

    context "Admin" do
      it "has a created group" do
        expect(admin.created_groups[0].name).to eq "Test"
      end

      it "is a member of created group" do
        expect(admin.groups[0].name).to eq "Test"
      end
    end

    context "Member" do
      it "is a member of a group" do
        expect(member.groups[0].name).to eq "Test"
      end
    end

    context "Creator" do
      it "has a created hangout" do
        expect(creator.created_hangouts[0]).to be_a Hangout
      end

      it "has joined a hangout" do
        expect(creator.hangouts).to all be_a Hangout
      end
    end

  end
end
