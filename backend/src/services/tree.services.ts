import {
  driver,
  database
} from "../database";

import {
  TreeResponse
} from "../types/tree.types";

export async function getTree(
  personId: string
): Promise<TreeResponse> {

  const session =
    driver.session({
      database
    });

  try {

    const result =
      await session.run(
        `
        MATCH (center:Personne {id:$personId})

        OPTIONAL MATCH
        path=(center)-[*0..2]-(relative)

        UNWIND nodes(path) AS n

        OPTIONAL MATCH
        (n)-[r]->(m:Personne)

        RETURN DISTINCT n,r,m
        `,
        {
          personId
        }
      );

    const nodeMap =
      new Map();

    const edges: {
      type: string;
      from: string;
      to: string;
    }[] = [];

    result.records.forEach(
      (record) => {

        const n =
          record.get("n");

        const r =
          record.get("r");

        const m =
          record.get("m");

        if (n) {

          const p =
            n.properties;

          nodeMap.set(
            p.id,
            {
              id:
                p.id,

              nomComplet:
                p.nomComplet || "",

              photo:
                p.photo || "",

              dateNaissance:
                p.dateNaissance || "",

              lieuNaissance:
                p.lieuNaissance || "",

              nationalite:
                p.nationalite || "",

              ethnie:
                p.ethnie || "",

              statutVital:
                p.statutVital || ""
            }
          );

        }

        if (
          m &&
          !nodeMap.has(
            m.properties.id
          )
        ) {

          const p =
            m.properties;

          nodeMap.set(
            p.id,
            {
              id:
                p.id,

              nomComplet:
                p.nomComplet || "",

              photo:
                p.photo || "",

              dateNaissance:
                p.dateNaissance || "",

              lieuNaissance:
                p.lieuNaissance || "",

              nationalite:
                p.nationalite || "",

              ethnie:
                p.ethnie || "",

              statutVital:
                p.statutVital || ""
            }
          );

        }

        if (
          n &&
          r &&
          m
        ) {

          edges.push({

            type:
              r.type,

            from:
              n.properties.id,

            to:
              m.properties.id

          });

        }

      }
    );

    return {

      nodes:
        Array.from(
          nodeMap.values()
        ),

      edges

    };

  } finally {

    await session.close();

  }

}