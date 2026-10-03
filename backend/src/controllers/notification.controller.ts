import {
  Request,
  Response
} from "express";

import {
  getNotificationsService
} from "../services/notification.service";

export async function getNotifications(
  _req: Request,
  res: Response
) {

  const notifications =
    await getNotificationsService();

  return res.json({

    notifications

  });

}