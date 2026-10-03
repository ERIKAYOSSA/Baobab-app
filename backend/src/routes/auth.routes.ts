import { Router } from "express";

import {
  sendOtp,
  verifyOtp,
  completeSignup
} from "../controllers/auth.controller";

const router = Router();

router.post(
  "/telephone",
  sendOtp
);

router.post(
  "/verifier-otp",
  verifyOtp
);

router.post(
  "/finaliser",
  completeSignup
);

export default router;