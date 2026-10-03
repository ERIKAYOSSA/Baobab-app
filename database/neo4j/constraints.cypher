CREATE CONSTRAINT demande_id_unique IF NOT EXISTS FOR (d:DemandeLien) REQUIRE d.id IS UNIQUE;
CREATE CONSTRAINT notification_id_unique IF NOT EXISTS FOR (n:Notification) REQUIRE n.id IS UNIQUE;
