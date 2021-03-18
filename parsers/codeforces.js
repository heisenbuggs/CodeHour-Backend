const axios = require("axios");
const {
  parserErrorHandler,
  getCurrentTimeInSeconds,
} = require("../utils/utils");

const contestPlatform = "Codeforces";
const codeforcesAPIURL = "http://codeforces.com/api/contest.list";

const isContestActive = (contest) => contest.phase.trim() !== "FINISHED";

const convertToFormat = (contest) => ({
  name: contest.name,
  url: `https://codeforces.com/contests/${contest.id}`,
  platform: contestPlatform,
  startTime: contest.startTimeSeconds,
  endTime: contest.startTimeSeconds + contest.durationSeconds,
  isLive:
    getCurrentTimeInSeconds() >= contest.startTimeSeconds &&
    getCurrentTimeInSeconds() <=
      contest.startTimeSeconds + contest.durationSeconds
      ? true
      : false,
});

const codeforces = () => {
  var list = {};
  axios
    .get(codeforcesAPIURL, { timeout: 15000 })
    .then(
      (res) =>
        (list[contestPlatform] = res.data.result
          .filter(isContestActive)
          .map(convertToFormat))
    )
    .catch(parserErrorHandler(contestPlatform));
  return list;
};

module.exports = codeforces;
