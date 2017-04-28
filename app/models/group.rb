class Group < ApplicationRecord
  has_and_belongs_to_many :members, class_name: "User", join_table: "groups_users", association_foreign_key: "user_id"
  belongs_to :admin, class_name: "User"
  has_many :hangouts
end
