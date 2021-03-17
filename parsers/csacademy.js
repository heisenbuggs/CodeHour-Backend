const axios = require("axios");
const { parserErrorHandler } = require("../utils/utils");

const contestPlatform = "CSAcademy";
const csacademyAPIURL = "https://csacademy.com/contests";

const convertToFormat = (contest) => ({
  name: contest.longName,
  url: `https://csacademy.com/contest/${contest.name}`,
  platform: contestPlatform,
  startTime: contest.startTime,
  endTime: contest.endTime,
});

const csacademy = () => {
  const options = {
    headers: {
      "x-requested-with": "XMLHttpRequest",
    },
    timeout: 15000,
  };
  return axios
    .get(csacademyAPIURL, options)
    .then((res) =>
      res.data.state.Contest.filter(
        (contest) => contest.startTime != null
      ).map((contest) => convertToFormat(contest))
    )
    .catch(parserErrorHandler(contestPlatform));
};

module.exports = csacademy;
