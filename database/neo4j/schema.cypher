CREATE CONSTRAINT personne_id_unique IF NOT EXISTS FOR (p:Personne) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT personne_tel_unique IF NOT EXISTS FOR (p:Personne) REQUIRE p.telephone IS UNIQUE;
CREATE CONSTRAINT famille_id_unique IF NOT EXISTS FOR (f:Famille) REQUIRE f.id IS UNIQUE;
