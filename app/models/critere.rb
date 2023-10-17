class Critere < ApplicationRecord

  belongs_to  :term
  belongs_to  :regle
  has_many   :hierarchies

  validates :operator, inclusion: { in: ['>', '<', '=' ] }

  def formatted_criteria
    "#{term.name} #{operator} #{value}"
  end
end
