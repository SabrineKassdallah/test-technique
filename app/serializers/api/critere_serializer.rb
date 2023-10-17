class Api::CritereSerializer < ActiveModel::Serializer
  attributes :id, :term_id, :operator, :value, :regle_id
end
