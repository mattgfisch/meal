class User < ApplicationRecord
  has_secure_password
  validates :name, :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  has_and_belongs_to_many :groups
  has_and_belongs_to_many :hangouts
  has_many :created_groups, class_name: "Group", foreign_key: "admin_id"
  has_many :created_hangouts, class_name: "Hangout", foreign_key: "creator_id"
end
