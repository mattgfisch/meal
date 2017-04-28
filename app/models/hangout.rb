class Hangout < ApplicationRecord
  has_and_belongs_to_many :members, class_name: "User", join_table: "hangouts_users", association_foreign_key: "user_id"
  belongs_to :group
  has_many :locations
  belongs_to :creator, class_name: 'User'
end
