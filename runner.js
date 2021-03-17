const axios = require("axios");
const { flat } = require("./utils/utils");

const codeforces = require("./parsers/codeforces");
const hackerearth = require("./parsers/hackerearth");
const topcoder = require("./parsers/topcoder");
const leetcode = require("./parsers/leetcode");
const csacademy = require("./parsers/csacademy");

var contestList = [{}];

const runner = () =>
  axios
    .all([codeforces(), hackerearth(), csacademy(), leetcode(), topcoder()])
    .then((contest) => {
      contestList = flat(
        contest.filter((it) => Array.isArray(it))
      );
    });
module.exports = { runner, contestList };
