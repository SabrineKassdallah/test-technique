class Term < ApplicationRecord
  has_many :criteres


  validates :term_type, inclusion: { in: ['string', 'date', 'entier' ] }

end
