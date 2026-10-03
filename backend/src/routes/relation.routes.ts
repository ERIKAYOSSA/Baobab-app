import { Router } from "express";

import {
  createParentRelation
} from "../controllers/relation.controller";

const router = Router();

router.post(
  "/parent",
  createParentRelation
);

export default router;