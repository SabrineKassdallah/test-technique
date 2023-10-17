class CreateHierarchies < ActiveRecord::Migration[6.1]
  def change
    create_table :hierarchies do |t|

      t.integer :regle_id
      t.integer :parent_id
      t.integer :critere_id
      t.string :node_type


      t.timestamps
    end

    add_index :hierarchies, :regle_id
    add_index :hierarchies, :parent_id
    add_index :hierarchies, :critere_id
  end
end
