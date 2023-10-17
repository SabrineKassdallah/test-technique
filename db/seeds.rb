# Table term
term_1 = Term.create(name:"age",term_type:"entier")
term_2 = Term.create(name:"sexe",term_type:"string")
term_4 = Term.create(name:"date_venue",term_type:"date")
# Table regle
regle = Regle.create(name:"regle1")

# Table critere
critere_1 = regle.criteres.create!( term: term_1, operator:"<", value:"10")
critere_2 = regle.criteres.create( term: term_2, operator:"=", value:"F")
critere_3 = regle.criteres.create( term: term_1, operator:">", value:"50")
critere_4 = regle.criteres.create( term: term_4, operator:"=", value:"8/1/2020")

#  Table hierarchy
hierarchy_1 = regle.hierarchies.create(node_type:"OU", parent_id: nil)
hierarchy_2 = regle.hierarchies.create(node_type:"ET", parent_id: hierarchy_1.id)
hierarchy_3 = regle.hierarchies.create(critere: critere_1 , parent_id: hierarchy_2.id)
hierarchy_4 = regle.hierarchies.create(critere: critere_2 , parent_id: hierarchy_2.id)
hierarchy_5 = regle.hierarchies.create(node_type:"ET", parent_id: hierarchy_1.id)
hierarchy_6 = regle.hierarchies.create(critere: critere_3 , parent_id: hierarchy_5.id)
hierarchy_7 = regle.hierarchies.create(critere: critere_4 , parent_id: hierarchy_5.id)