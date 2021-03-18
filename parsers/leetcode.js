const axios = require("axios");
const {
  parserErrorHandler,
  getCurrentTimeInSeconds,
} = require("../utils/utils");

const contestPlatform = "Leetcode";
const leetcodeAPIURL = "https://leetcode.com/contest/api/list";

const isContestActive = (currTime) => (contest) =>
  contest.start_time + contest.duration > currTime;

const convertToFormat = (contest) => ({
  name: contest.title,
  url: `https://leetcode.com/contest/${contest.title_slug}`,
  platform: contestPlatform,
  startTime: contest.start_time,
  endTime: contest.start_time + contest.duration,
  isLive:
    getCurrentTimeInSeconds() >= contest.start_time &&
    getCurrentTimeInSeconds() <= contest.start_time + contest.duration
      ? true
      : false,
});

const leetcode = () => {
  var list = {};
  axios
    .get(leetcodeAPIURL, { timeout: 15000 })
    .then(
      (res) =>
        (list["Leetcode"] = res.data.contests
          .filter(isContestActive(getCurrentTimeInSeconds()))
          .map(convertToFormat))
    )
    .catch(parserErrorHandler(contestPlatform));
    return list;
};

module.exports = leetcode;
