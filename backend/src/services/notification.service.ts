import {
  driver,
  database
} from "../database";

export async function getNotificationsService() {

  const session =
    driver.session({
      database
    });

  try {

    const result =
      await session.run(
        `
        MATCH (n:Notification)

        RETURN n

        ORDER BY
        n.createdAt DESC
        `
      );

    return result.records.map(
      (record) => {

        const n =
          record.get("n")
          .properties;

        return {

          id:
            n.id,

          type:
            n.type,

          texte:
            n.texte,

          lu:
            n.lu

        };

      }
    );

  } finally {

    await session.close();

  }

}