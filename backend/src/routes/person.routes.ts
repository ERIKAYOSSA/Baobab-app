import {
  Router
} from "express";

import {
  searchPeople,
  createRelative,
  mergePeople
} from "../controllers/person.controller";

const router =
  Router();

router.get(
  "/recherche",
  searchPeople
);

router.post(
  "/:id/proche",
  createRelative
);

router.post(
  "/:id/fusionner",
  mergePeople
);

export default router;