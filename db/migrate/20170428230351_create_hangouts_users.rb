class CreateHangoutsUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :hangouts_users do |t|
      t.belongs_to :user, index: true
      t.belongs_to :hangout, index: true
    end
  end
end
