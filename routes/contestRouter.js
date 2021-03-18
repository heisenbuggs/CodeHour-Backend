const express = require("express");
const Contests = require("../models/contests");
const verifyUser = require("../authenticate").verifyUser;
const hackerearth = require("../parsers/hackerearth");
const leetcode = require("../parsers/leetcode");
const codeforces = require("../parsers/codeforces");
const runner = require("../runner");

const contestRouter = express.Router();
contestRouter.use(express.json());

var array = codeforces();

contestRouter.route("/").get(verifyUser, (req, res, next) => {
  Contests.find({})
    .then(
      (contest) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(array);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

module.exports = contestRouter;
