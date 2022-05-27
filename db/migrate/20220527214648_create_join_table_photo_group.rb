class CreateJoinTablePhotoGroup < ActiveRecord::Migration[7.0]
  def change
    create_join_table :photos, :groups do |t|
      # t.index [:photo_id, :group_id]
      # t.index [:group_id, :photo_id]
    end
  end
end
