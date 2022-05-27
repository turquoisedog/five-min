class AddMetadataToPhotos < ActiveRecord::Migration[7.0]
  def change
    add_column :photos, :metadata, :json
  end
end
