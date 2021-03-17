const axios = require("axios");
const { parserErrorHandler } = require("../utils/utils");

const contestPlatform = "Hackerearth";

const hackerearth = () => {
  const getStartTime = (contest) =>
    new Date(contest.start_utc_tz).getTime() / 1000;
  const getEndTime = (contest) => new Date(contest.end_utc_tz).getTime() / 1000;

  return axios
    .get("https://www.hackerearth.com/chrome-extension/events/", {
      timeout: 15000,
    })
    .then((response) =>
      response.data.response.map((contest) => ({
        name: contest.title,
        url: contest.url,
        platform: contestPlatform,
        startTime: getStartTime(contest),
        endTime: getEndTime(contest),
      }))
    )
    .catch(parserErrorHandler(contestPlatform));
};

module.exports = hackerearth;
