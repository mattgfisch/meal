require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    let (:admin){User.create(name: "Admin", email: "admin@admin.com", password: "password")}
    let (:creator){User.create(name: "Creator", email: "creator@creator.com", password: "password")}
    let (:member){User.create(name: "Member", email: "member@member.com", password: "password")}
    let (:group){Group.new(name: "Test")}

    before(:each) do
      admin.created_groups << group
      group.save
      group.users << creator
      group.users << member
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
  end
end
