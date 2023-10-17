class Hierarchy < ApplicationRecord

  belongs_to :critere, optional: true
  belongs_to :regle

  has_many :child_hierarchies, class_name: "Hierarchy", foreign_key: 'parent_id'

  validates :node_type, inclusion: { in: ['OR', 'ET',nil ] }
end
