CREATE (yris:Personne {id:'1',nom:'MBAKOB',prenom:'Yris'});
CREATE (pere:Personne {id:'2',nom:'MBAKOB',prenom:'Jean'});
CREATE (pere)-[:PARENT_DE]->(yris);