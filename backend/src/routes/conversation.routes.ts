import { Router } from "express";

import {
  createConversation,
  getMessages,
  sendMessage
} from "../controllers/conversation.controller";

const router = Router();

router.post(
  "/:personneId",
  createConversation
);

router.get(
  "/:id/messages",
  getMessages
);

router.post(
  "/:id/messages",
  sendMessage
);

export default router;