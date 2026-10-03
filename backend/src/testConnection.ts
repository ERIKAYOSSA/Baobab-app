import { driver, database } from "./database";

async function testConnection() {
  const session = driver.session({
    database
  });

  try {
    const result = await session.run(
      "MATCH (p:Personne) RETURN count(p) as total"
    );

    console.log(
      "Connexion réussie ✅"
    );

    console.log(
      "Total personnes :",
      result.records[0].get("total")
    );
  } catch (error) {
    console.error(
      "Erreur connexion ❌",
      error
    );
  } finally {
    await session.close();
    await driver.close();
  }
}

testConnection();