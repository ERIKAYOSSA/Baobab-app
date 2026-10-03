import {
  Request,
  Response
} from "express";

import {
  getMyProfileService,
  updateProfileService
} from "../services/profile.service";

export async function getMyProfile(
  _req: Request,
  res: Response
) {

  const personne =
    await getMyProfileService(
      "P007"
    );

  return res.json({
    personne
  });

}

export async function updateProfile(
  req: Request,
  res: Response
) {

  const personne =
    await updateProfileService(
      req.body
    );

  return res.json({
    personne
  });

}

export async function uploadIdentity(
  _req: Request,
  res: Response
) {

  return res.json({
    success: true
  });

}