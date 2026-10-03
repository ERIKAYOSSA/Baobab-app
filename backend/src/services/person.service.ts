import {
  driver,
  database
} from "../database";

import {
  randomUUID
} from "crypto";

export async function searchPeopleService(
  query: string
) {

  const session =
    driver.session({
      database
    });

  try {

    const result =
      await session.run(
        `
        MATCH (p:Personne)

        WHERE
        toLower(
          p.nomComplet
        )
        CONTAINS
        toLower($query)

        RETURN p

        LIMIT 20
        `,
        {
          query
        }
      );

    return result.records.map(
      (record) => {

        const p =
          record.get("p")
          .properties;

        return {

          id:
            p.id,

          nomComplet:
            p.nomComplet,

          dateNaissance:
            p.dateNaissance || "",

          lieuNaissance:
            p.lieuNaissance || "",

          nationalite:
            p.nationalite || "",

          ethnie:
            p.ethnie || "",

          photo:
            p.photo || ""

        };

      }
    );

  } finally {

    await session.close();

  }

}

export async function createRelativeService(
  personId: string,
  data: {
    nomComplet: string;
    dateNaissance?: string;
    lieuNaissance?: string;
    genre?: string;
    typeLien: string;
  }
) {

  const session =
    driver.session({
      database
    });

  try {

    const relativeId =
      randomUUID();

    let relationQuery = "";

    switch (
      data.typeLien
    ) {

      case "parent":

        relationQuery =
          `
          CREATE
          (r)-[:PARENT_DE]->(p)
          `;

        break;

      case "enfant":

        relationQuery =
          `
          CREATE
          (p)-[:PARENT_DE]->(r)
          `;

        break;

      case "conjoint":

        relationQuery =
          `
          CREATE
          (p)-[:CONJOINT_DE]->(r)
          `;

        break;

      case "frere_soeur":

        relationQuery =
          `
          CREATE
          (p)-[:FRERE_SOEUR_DE]->(r)
          `;

        break;

      default:

        relationQuery = "";

    }

    await session.run(
      `
      MATCH
      (p:Personne {
        id:$personId
      })

      CREATE
      (r:Personne {

        id:$relativeId,

        nomComplet:$nomComplet,

        dateNaissance:$dateNaissance,

        lieuNaissance:$lieuNaissance,

        genre:$genre,

        createdAt:datetime()

      })

      ${relationQuery}

      RETURN r
      `,
      {

        personId,

        relativeId,

        nomComplet:
          data.nomComplet,

        dateNaissance:
          data.dateNaissance || "",

        lieuNaissance:
          data.lieuNaissance || "",

        genre:
          data.genre || ""

      }
    );

    return {

      id: relativeId

    };

  } finally {

    await session.close();

  }

}
export async function mergePeopleService(
  personId: string,
  doublonId: string
) {

  return {

    success: true,

    personId,

    doublonId

  };

}