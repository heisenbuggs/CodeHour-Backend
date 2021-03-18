const axios = require("axios");
const {
  parserErrorHandler,
  getCurrentTimeInSeconds,
} = require("../utils/utils");

const contestPlatform = "Hackerearth";

const hackerearth = () => {
  const getStartTime = (contest) =>
    new Date(contest.start_utc_tz).getTime() / 1000;
  const getEndTime = (contest) => new Date(contest.end_utc_tz).getTime() / 1000;

  var list = {};

  axios
    .get("https://www.hackerearth.com/chrome-extension/events/", {
      timeout: 15000,
    })
    .then((res) =>
      list[contestPlatform] = (
        res.data.response.map((contest) => ({
          name: contest.title,
          url: contest.url,
          platform: contestPlatform,
          startTime: getStartTime(contest),
          endTime: getEndTime(contest),
          isLive:
            getCurrentTimeInSeconds() >= getStartTime(contest) &&
            getCurrentTimeInSeconds() <= getEndTime(contest)
              ? true
              : false,
        }))
      )
    )
    .catch(parserErrorHandler(contestPlatform));
  return list;
};

module.exports = hackerearth;
