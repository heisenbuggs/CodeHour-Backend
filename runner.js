const axios = require("axios");
const { flat } = require("./utils/utils");

const codeforces = require("./parsers/codeforces");
const hackerearth = require("./parsers/hackerearth");
const topcoder = require("./parsers/topcoder");
const leetcode = require("./parsers/leetcode");
const csacademy = require("./parsers/csacademy");

var contestList = {};
const runner = () => {
  codeforces();
  hackerearth();
  topcoder();
  leetcode();
  csacademy();
  return contestList;
}
  
module.exports = { runner, contestList };
