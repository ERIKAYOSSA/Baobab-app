import { driver, database } from "../database";

export async function ajouterParent(
  parentId: string,
  enfantId: string
) {
  const session = driver.session({
    database
  });

  try {

    await session.run(
      `
      MATCH (parent:Personne {id:$parentId})
      MATCH (enfant:Personne {id:$enfantId})

      MERGE
      (parent)-[:PARENT_DE]->(enfant)
      `,
      {
        parentId,
        enfantId
      }
    );

    return {
      success: true,
      message: "Relation parent créée"
    };

  } finally {
    await session.close();
  }
}