class Regle < ApplicationRecord
  has_many   :criteres
  has_many   :hierarchies

  def to_logical_expression
    root_hierarchy = hierarchies.find_by(parent_id: nil)
    return '' if root_hierarchy.nil?

    build_expression(root_hierarchy)
  end

  def self.create_resource(attributes)
    resource = Regle.create(name: attributes[:name])

    root_node = attributes["hierarchy"].to_h
    root_hierarchy = resource.hierarchies.create(node_type: root_node["node_type"])
    root_node["childrens"].each do |child|
      critere = Critere.create(
        regle_id: resource.id,
        value: child["critere"]["value"],
        term_id: child["critere"]["term_id"],
        operator: child["critere"]["operator"]
      )
      hierarchy = Hierarchy.create( regle: resource, parent_id: root_hierarchy.id, critere_id: critere.id)
    end
    resource
  end

  def update_resource(attributes)
    update(name: attributes[:name])

    root_node = attributes["hierarchy"].to_h
    root_hierarchy = hierarchies.find_by(parent_id:nil)
    root_hierarchy.update(node_type: root_node["node_type"])
    root_hierarchy.child_hierarchies.destroy_all

    root_node["childrens"].each do |child|
      critere = Critere.create(
        regle_id: id,
        value: child["critere"]["value"],
        term_id: child["critere"]["term_id"],
        operator: child["critere"]["operator"]
      )
      hierarchy = Hierarchy.create( regle: self, parent_id: root_hierarchy.id, critere_id: critere.id)
    end
  end


  def json_format
    root_hierarchy = hierarchies.find_by(parent_id: nil)
    hierarchy_data = {
      node_type:root_hierarchy.node_type,
      childrens: []
    }
    
    root_hierarchy.child_hierarchies.includes(:critere).each do |hierarchy|
      next if hierarchy.node_type == ""

      critere = hierarchy.critere
      hierarchy_data[:childrens] << {
        critere: {
          term_id: critere.term_id,
          operator: critere.operator,
          value: critere.value
        }
      }
    end
    {
      name: name,
      hierarchy: hierarchy_data
    }    
  end

  private


  def build_expression(hierarchy)
    if hierarchy.node_type == 'OR' || hierarchy.node_type == 'ET'
      child_expressions = hierarchy.child_hierarchies.map { |child| build_expression(child) }
      return "(#{child_expressions.join(" #{hierarchy.node_type} ")})"
    elsif hierarchy.critere
      critere = hierarchy.critere
      return "#{critere.term.name} #{critere.operator} #{critere.value}"
    end
  end

end
