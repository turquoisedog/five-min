class GroupPhoto < ApplicationRecord
  self.table_name = "groups_photos"

  belongs_to :group
  belongs_to :photo
end
