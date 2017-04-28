class CreateHangouts < ActiveRecord::Migration[5.0]
  def change
    create_table :hangouts do |t|
      t.integer :creator_id
      t.integer :group_id

      t.timestamps null: false
    end
  end
end
