class AddAdminLockHangout < ActiveRecord::Migration[5.0]
  def change
    add_column :hangouts, :locked_out, :boolean
  end
end
