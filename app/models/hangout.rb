class Hangout < ApplicationRecord
  has_and_belongs_to_many :members, class_name: "User", join_table: "hangouts_users", association_foreign_key: "user_id"
  belongs_to :group
  has_many :locations
  belongs_to :creator, class_name: 'User'

  def self.center_point
    total_lat = 0
    total_long = 0
    self.locations.each do |location|
      total_lat += location.latitude
      total_long += location.longitude
    end
    average_lat = total_lat / self.locations.count
    average_long = total_long / self.locations.count

    {average_lat: average_lat, average_long: average_long}
  end
end
