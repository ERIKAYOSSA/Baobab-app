import { Request, Response } from "express";

export async function sendOtp(
  req: Request,
  res: Response
) {

  const { telephone } =
    req.body;

  return res.json({
    success: true,
    telephone,
    debugCode: "123456"
  });

}

export async function verifyOtp(
  req: Request,
  res: Response
) {

  const {
    telephone,
    code
  } = req.body;

  return res.json({
    existing: false,
    telephone,
    code
  });

}

export async function completeSignup(
  req: Request,
  res: Response
) {

  return res.json({
    accessToken: "token",
    refreshToken: "refresh",
    personne: req.body
  });

}
