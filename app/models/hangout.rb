class Hangout < ApplicationRecord
  has_and_belongs_to_many :members, class_name: "User", join_table: "hangouts_users", association_foreign_key: "user_id"
  belongs_to :group
  has_many :locations
  belongs_to :creator, class_name: 'User'
  attr_accessor :center_point

  def center_point
    total_lat = 0
    total_long = 0
    self.locations.each do |location|
      total_lat += location.latitude
      total_long += location.longitude
    end
    if !(self.locations.empty?)
      average_lat = total_lat / self.locations.count
      average_long = total_long / self.locations.count
    else
      average_lat = nil
      average_long = nil
    end
    {average_lat: average_lat, average_long: average_long}
  end
end
