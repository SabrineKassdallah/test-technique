class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :crypted_password
      t.integer :genre
      t.string :email
      t.string :telephone

      t.timestamps
    end
  end
end
