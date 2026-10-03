import { Router } from "express";

import {
  getTreeController
} from "../controllers/tree.controller";

const router = Router();

router.get(
  "/:id",
  getTreeController
);

export default router;