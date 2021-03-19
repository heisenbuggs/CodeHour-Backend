const axios = require("axios");
const cheerio = require("cheerio");
const { getCurrentTimeInSeconds } = require("../utils/utils");

function parseContestDetails($, contestRow) {
  const details = $(contestRow).find("td");
  const startTime =
    new Date(details.eq(2).attr("data-starttime")).getTime() / 1000;
  const endTime = new Date(details.eq(3).attr("data-endtime")).getTime() / 1000;
  const isLive =
    getCurrentTimeInSeconds() >= startTime &&
    getCurrentTimeInSeconds() <= endTime
      ? true
      : false;

  return {
    name: details.eq(1).text(),
    url: `http://www.codechef.com${details.eq(1).find("a").attr("href")}`,
    platform: "Codechef",
    startTime,
    endTime,
    isLive,
  };
}

const codechef = () => {
  var list = {};
  axios
    .get("http://www.codechef.com/contests", { timeout: 30000 })
    .then((res) => {
      const $ = cheerio.load(res.data);
      const statusdiv = $("table .dataTable");
      const headings = $("h2");
      const contestTables = {
        "Upcoming Coding Contests": [],
        "Present Coding Contests": [],
      };

      for (let i = 0; i < headings.length; i++) {
        if (headings.eq(i).text() !== "Past Coding Contests") {
          contestTables[headings.eq(i).text()] = statusdiv
            .eq(i)
            .find("tr")
            .slice(1);
        }
      }
      let contests = contestTables["Present Coding Contests"].map((i, elem) =>
        parseContestDetails($, elem).get()
      );
      // console.log(contestTables);

      contests = contests.concat(
        contestTables["Upcoming Coding Contests"].map((i, elem) =>
          parseContestDetails($, elem)
        )
      );
      list["Codechef"] = contests;
      // console.log(contests);
    })
    .catch((error) => {
      console.log("Codechef: ", error.toString());
    });
  return list;
};

module.exports = codechef;
