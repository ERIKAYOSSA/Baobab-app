MATCH (parent)-[:PARENT_DE]->(enfant:Personne {id:$id}) RETURN parent;
MATCH (a:Personne {id:$id1}),(b:Personne {id:$id2}) MATCH p=shortestPath((a)-[*..20]-(b)) RETURN p;
