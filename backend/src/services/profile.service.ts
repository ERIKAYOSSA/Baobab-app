import {
  driver,
  database
} from "../database";

export async function getMyProfileService(
  personId: string
) {

  const session =
    driver.session({
      database
    });

  try {

    const result =
      await session.run(
        `
        MATCH (p:Personne {id:$personId})

        RETURN p
        `,
        {
          personId
        }
      );

    if (
      result.records.length === 0
    ) {
      return null;
    }

    return result
      .records[0]
      .get("p")
      .properties;

  } finally {

    await session.close();

  }

}

export async function updateProfileService(
  data: unknown
) {

  return data;

}