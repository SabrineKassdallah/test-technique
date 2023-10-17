class Api::TermSerializer < ActiveModel::Serializer
  attributes :id, :name, :term_type
end
