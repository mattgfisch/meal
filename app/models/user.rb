class User < ApplicationRecord
  has_secure_password

  has_and_belongs_to_many :groups
  has_many :hangouts, through: :groups, source: :hangout
  has_many :created_groups, foreign_key: :admin_id
  has_many :created_hangouts, foreign_key: :creator_id
end
