import {
 Request,
 Response
}
from "express";

export async function createConversation(
 _req: Request,
 res: Response
) {

 return res.json({
  conversation: {
   id: "C001"
  }
 });

}

export async function getMessages(
 _req: Request,
 res: Response
) {

 return res.json({
  messages: []
 });

}

export async function sendMessage(
 req: Request,
 res: Response
) {

 return res.json({
  message: {
   id: "M001",
   texte: req.body.texte
  }
 });

}