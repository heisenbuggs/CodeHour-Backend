const express = require("express");
const Contests = require("../models/contests");
const contestList = require("../runner").contestList;
const verifyUser = require("../authenticate").verifyUser;

const contestRouter = express.Router();
contestRouter.use(express.json());

contestRouter.route("/").get(verifyUser, (req, res, next) => {
  Contests.find({})
    .then(
      (contest) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(contestList);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

module.exports = contestRouter;
