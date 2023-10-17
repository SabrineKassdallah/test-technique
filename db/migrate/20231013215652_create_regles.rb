class CreateRegles < ActiveRecord::Migration[6.1]
  def change
    create_table :regles do |t|
      t.string :name

      t.timestamps
    end
  end
end
