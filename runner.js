const codeforces = require("./parsers/codeforces");
const hackerearth = require("./parsers/hackerearth");
const topcoder = require("./parsers/topcoder");
const leetcode = require("./parsers/leetcode");
const csacademy = require("./parsers/csacademy");

const runner = () => {
  var cfList = codeforces();
  var heList = hackerearth();
  var tcList = topcoder();
  var lcList = leetcode();
  var csaList = csacademy();
  var contestList = {
    cfList,
    heList,
    tcList,
    lcList,
    csaList,
  };
  return contestList;
};

module.exports = runner;
