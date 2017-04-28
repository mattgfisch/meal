class Hangout < ApplicationRecord
  has_many :users, through: :groups, source: :user
  belongs_to :group
  has_many :locations
  belongs_to :creator, class_name: 'User'
end
