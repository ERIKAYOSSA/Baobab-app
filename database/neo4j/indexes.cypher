CREATE INDEX personne_nom_index IF NOT EXISTS FOR (p:Personne) ON (p.nom);
CREATE INDEX personne_prenom_index IF NOT EXISTS FOR (p:Personne) ON (p.prenom);
CREATE INDEX personne_ethnie_index IF NOT EXISTS FOR (p:Personne) ON (p.ethnie);
