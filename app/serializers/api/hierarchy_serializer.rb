class Api::HierarchySerializer < ActiveModel::Serializer
  attributes :id, :parent_id, :regle_id, :critere_id, :node_type
end
