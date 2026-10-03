import {
  Request,
  Response
} from "express";

import {
  getTree
} from "../services/tree.services";

export async function getTreeController(
  req: Request,
  res: Response
) {

  const id =
  req.params.id as string;

  const tree =
  await getTree(id);

  return res.json(
    tree
  );

}