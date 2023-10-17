class Api::RegleSerializer < ActiveModel::Serializer
  attributes :id, :name, :expression

  def expression
    object.to_logical_expression
  end
end
