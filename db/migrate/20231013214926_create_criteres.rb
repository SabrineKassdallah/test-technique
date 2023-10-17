class CreateCriteres < ActiveRecord::Migration[6.1]
  def change
    create_table :criteres do |t|
      t.string  :value
      t.integer :term_id
      t.string :operator
      t.integer :regle_id

      t.timestamps
    end
    add_index :criteres, :regle_id
    add_index :criteres, :term_id
  end
end
