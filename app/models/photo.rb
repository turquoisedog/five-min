class Photo < ApplicationRecord
  store :metadata, accessors: [
    :camera_name, :lens, :iso, :shutter_speed, :aperture, :date_taken
  ], coder: JSON

  has_and_belongs_to_many :groups

  has_one_attached :asset do |asset|
    asset.variant :large, resize_to_limit: [1000, 1000], format: :jpeg, saver: { quality: 90 }
    asset.variant :thumb, resize_to_fill: [200, 200, crop: :centre], format: :png
  end

  #noinspection RubyResolve
  def after_create
    exif = asset.open { |file| Exif::Data.new(file) }

    self.metadata[:camera_name] = "#{exif.make.capitalize} #{exif.model}"
    self.metadata[:lens] = exif[:exif][:lens_model]
    self.metadata[:iso] = exif[:exif][:iso_speed_ratings]
    self.metadata[:shutter_speed] = exif[:exif][:exposure_time]
    self.metadata[:aperture] = exif[:exif][:fnumber].to_r.to_f
    self.metadata[:date_taken] = exif[:exif][:date_time_original]

    self.save!
  end
end
