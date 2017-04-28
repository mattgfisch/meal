class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.decimal :latitude, precision: 13, scale: 9, null: false
      t.decimal :longitude, precision: 13, scale: 9, null: false
      t.integer :hangout_id

      t.timestamps null: false
    end
  end
end
