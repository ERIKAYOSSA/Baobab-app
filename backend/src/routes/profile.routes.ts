import { Router } from "express";

import {
  getMyProfile,
  updateProfile,
  uploadIdentity
} from "../controllers/profile.controller";

const router = Router();

router.get(
  "/",
  getMyProfile
);

router.patch(
  "/",
  updateProfile
);

router.post(
  "/piece-identite",
  uploadIdentity
);

export default router;