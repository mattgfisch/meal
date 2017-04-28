class User < ApplicationRecord
  has_secure_password

  has_and_belongs_to_many :groups
  has_and_belongs_to_many :hangouts
  has_many :created_groups, class_name: "Group", foreign_key: "admin_id"
  has_many :created_hangouts, class_name: "Hangout", foreign_key: "creator_id"
end
