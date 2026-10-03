import {
  Request,
  Response
} from "express";

import {
  searchPeopleService,
  createRelativeService,
  mergePeopleService
} from "../services/person.service";

export async function searchPeople(
  req: Request,
  res: Response
) {

  const query =
    String(
      req.query.q || ""
    );

  const results =
    await searchPeopleService(
      query
    );

  return res.json({
    results
  });

}

export async function createRelative(
  req: Request,
  res: Response
) {

  const personId =
    String(
      req.params.id
    );

  const proche =
    await createRelativeService(
      personId,
      req.body
    );

  return res.json({

    proche,

    correspondances: []

  });

}

export async function mergePeople(
  req: Request,
  res: Response
) {

  const result =
    await mergePeopleService(
      String(req.params.id),
      String(req.body.doublonId)
    );

  return res.json(
    result
  );

}