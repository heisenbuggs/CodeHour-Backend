const express = require("express");
const Contests = require("../models/contests");
const verifyUser = require("../authenticate").verifyUser;
const runner = require("../runner");
var cron = require("node-cron");

const contestRouter = express.Router();
contestRouter.use(express.json());

var contestList = runner();
cron.schedule('* 1 * * *', () => {
  contestList = runner();
});

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
