import express from "express";
import cors from "cors";
import helmet from "helmet";
import arbreRoutes from "./routes/tree.routes";
import personneRoutes
from "./routes/person.routes";
import relationRoutes
from "./routes/relation.routes";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import personRoutes from "./routes/person.routes";
import treeRoutes from "./routes/tree.routes";
import conversationRoutes from "./routes/conversation.routes";
import notificationRoutes from "./routes/notification.routes";

const app = express();
app.use(
  "/api/inscription",
  authRoutes
);

app.use(
  "/api/moi",
  profileRoutes
);

app.use(
  "/api/personnes",
  personRoutes
);

app.use(
  "/api/arbre",
  treeRoutes
);

app.use(
  "/api/conversations",
  conversationRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/arbre", arbreRoutes);
app.use(
  "/api/personnes",
  personneRoutes
);
app.use(
  "/api/relations",
  relationRoutes
);
app.get("/test", (_req, res) => {
  res.json({
    message: "Test OK"
  });
});

export default app;