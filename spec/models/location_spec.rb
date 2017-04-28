require 'rails_helper'

RSpec.describe Location, type: :model do
  describe "Location" do
    let (:hangout){Hangout.new()}
    let (:loc1){Location.create(latitude: 11.33242345, longitude: 12.2343234)}
    let (:loc2){Location.create(latitude: 12.3324234, longitude: 12.2343234)}
    before(:each) do
      hangout.locations << loc1
      hangout.locations << loc2
      hangout.save
    end

    context "attributes" do
      it "has a longitude" do
        expect(loc1.longitude).to eq 12.2343234
      end

      it "has a latitude" do
        expect(loc1.latitude).to eq 11.33242345
      end
    end

    context "associations" do
      it "has a hangout" do
        expect(loc2.hangout).to be_a Hangout
      end
    end

  end
end
