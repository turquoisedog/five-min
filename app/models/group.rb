class Group < ApplicationRecord
  has_and_belongs_to_many :photos

  def sgid
    self.to_sgid.to_s
  end
end
