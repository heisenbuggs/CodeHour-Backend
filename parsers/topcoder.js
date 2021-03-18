const axios = require("axios");
const {
  parserErrorHandler,
  getCurrentTimeInSeconds,
} = require("../utils/utils");

const contestPlatform = "Topcoder";
const topcoderAPIURL =
  "https://clients6.google.com/calendar/v3/calendars/appirio.com_bhga3musitat85mhdrng9035jg@group.calendar.google.com/events?calendarId=appirio.com_bhga3musitat85mhdrng9035jg%40group.calendar.google.com&timeMin=2017-07-10T00%3A00%3A00-04%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs";

const convertToFormat = (contest) => ({
  name: contest.summary,
  url: "http://topcoder.com",
  platform: contestPlatform,
  startTime: new Date(contest.start.dateTime).getTime() / 1000,
  endTime: new Date(contest.end.dateTime).getTime() / 1000,
  isLive:
    getCurrentTimeInSeconds() >=
      new Date(contest.start.dateTime).getTime() / 1000 &&
    getCurrentTimeInSeconds() <= new Date(contest.end.dateTime).getTime() / 1000
      ? true
      : false,
});

const hasStartAndEndDateTime = (it) =>
  it.start && it.start.dateTime && it.end && it.end.dateTime;

const topcoder = () => {
  var list = {};
  axios
    .get(topcoderAPIURL, { timeout: 15000 })
    .then((res) =>
      list[contestPlatform] = (
        res.data.items.filter(hasStartAndEndDateTime).map(convertToFormat)
      )
    )
    .catch(parserErrorHandler(contestPlatform));
  return list;
};

module.exports = topcoder;
