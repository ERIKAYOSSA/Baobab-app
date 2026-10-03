import { Request, Response } from "express";

import {
  ajouterParent
} from "../services/relation.service";

export async function createParentRelation(
  req: Request,
  res: Response
) {

  const {
    parentId,
    enfantId
  } = req.body;

  const resultat =
    await ajouterParent(
      parentId,
      enfantId
    );

  return res.json(resultat);
}