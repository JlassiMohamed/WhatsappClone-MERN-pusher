import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.post("/new", (req, res) => {
  const dbMessage = req.body;
  Message.create(dbMessage, (err, data) => {
    err
      ? res.status(500).send(err)
      : res.status(201).send({ msg: "new message is created", message: data });
  });
});

router.get("/sync", (req, res) => {
  Message.find((err, data) => {
    err ? res.status(500).send(err) : res.status(201).send(data);
  });
});
export default router;
