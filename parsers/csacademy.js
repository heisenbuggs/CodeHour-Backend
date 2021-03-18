const axios = require("axios");
const {
  parserErrorHandler,
  getCurrentTimeInSeconds,
} = require("../utils/utils");

const contestPlatform = "CSAcademy";
const csacademyAPIURL = "https://csacademy.com/contests";

const convertToFormat = (contest) => ({
  name: contest.longName,
  url: `https://csacademy.com/contest/${contest.name}`,
  platform: contestPlatform,
  startTime: contest.startTime,
  endTime: contest.endTime,
  isLive:
    getCurrentTimeInSeconds() >= contest.startTime &&
    getCurrentTimeInSeconds() <= contest.endTime
      ? true
      : false,
});

const csacademy = () => {
  var list = {};
  const options = {
    headers: {
      "x-requested-with": "XMLHttpRequest",
    },
    timeout: 15000,
  };
  axios
    .get(csacademyAPIURL, options)
    .then(
      (res) =>
        (list[contestPlatform] = res.data.state.Contest.filter(
          (contest) => contest.startTime != null
        ).map((contest) => convertToFormat(contest)))
    )
    .catch(parserErrorHandler(contestPlatform));
  return list;
};

module.exports = csacademy;
