json.extract! photo, :id, :asset, :created_at, :updated_at
json.url photo_url(photo, format: :json)
json.asset url_for(photo.asset)
