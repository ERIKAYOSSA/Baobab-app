import {
  driver,
  database
} from "../database";

import {
  randomUUID
} from "crypto";

export async function createConversationService(
  personneId: string
) {

  const session =
    driver.session({
      database
    });

  try {

    const conversationId =
      randomUUID();

    await session.run(
      `
      CREATE
      (c:Conversation {

        id:$conversationId,

        createdAt:datetime()

      })

      RETURN c
      `,
      {
        conversationId
      }
    );

    return {
      id: conversationId
    };

  } finally {

    await session.close();

  }

}
export async function getMessagesService(
  conversationId: string
) {

  const session =
    driver.session({
      database
    });

  try {

    const result =
      await session.run(
        `
        MATCH
        (c:Conversation {id:$conversationId})

        -[:CONTIENT]->

        (m:Message)

        RETURN m

        ORDER BY
        m.createdAt
        `,
        {
          conversationId
        }
      );

    return result.records.map(
      (record) => {

        const m =
          record.get("m")
          .properties;

        return {

          id:
            m.id,

          texte:
            m.texte,

          auteurId:
            m.auteurId,

          createdAt:
            m.createdAt

        };

      }
    );

  } finally {

    await session.close();

  }

}
export async function sendMessageService(
  conversationId: string,
  texte: string
) {

  const session =
    driver.session({
      database
    });

  try {

    const messageId =
      randomUUID();

    await session.run(
      `
      MATCH
      (c:Conversation {
        id:$conversationId
      })

      CREATE
      (m:Message {

        id:$messageId,

        texte:$texte,

        auteurId:"P007",

        createdAt:datetime()

      })

      CREATE
      (c)-[:CONTIENT]->(m)
      `,
      {
        conversationId,
        messageId,
        texte
      }
    );

    return {

      id: messageId,

      texte

    };

  } finally {

    await session.close();

  }

}