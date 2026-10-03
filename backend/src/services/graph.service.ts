import { driver, database } from "../database";

export async function getGraph(
  id: string
) {

  const session = driver.session({
    database
  });

  try {

    const result =
      await session.run(
        `
        MATCH path=
        (n:Personne {id:$id})

        <-[:PARENT_DE*0..2]-()

        RETURN path
        `,
        { id }
      );

    const nodes: any[] = [];

    const edges: any[] = [];

    result.records.forEach(
      (record) => {

        const path =
          record.get("path");

        path.segments.forEach(
          (segment: any) => {

            const start =
              segment.start.properties;

            const end =
              segment.end.properties;

            nodes.push({
              id: start.id,

              data: {
                label:
                  start.displayName
                  ||
                  `${start.prenom} ${start.nom}`,

                photo:
                  start.photo || ""
              },

              position: {
                x: 0,
                y: 0
              }
            });

            nodes.push({
              id: end.id,

              data: {
                label:
                  end.displayName
                  ||
                  `${end.prenom} ${end.nom}`,

                photo:
                  end.photo || ""
              },

              position: {
                x: 0,
                y: 0
              }
            });

            edges.push({
              id:
                `${start.id}-${end.id}`,

              source:
                start.id,

              target:
                end.id
            });

          });

      });

    return {
      nodes,
      edges
    };

  } finally {

    await session.close();

  }

}
