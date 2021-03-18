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
});

const leetcode = () =>
  axios
    .get(leetcodeAPIURL, { timeout: 15000 })
    .then((res) =>
      res.data.contests
        .filter(isContestActive(getCurrentTimeInSeconds()))
        .map(convertToFormat)
    )
    .catch(parserErrorHandler(contestPlatform));

module.exports = leetcode;
