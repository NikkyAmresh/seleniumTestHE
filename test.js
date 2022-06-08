require("chromedriver");
const assert = require("assert");
const chai = require("chai");
const { jestSnapshotPlugin } = require("mocha-chai-jest-snapshot");
const expect = chai.expect;
chai.use(jestSnapshotPlugin());

// const baseUrl = "http://localhost:8000";/
const baseUrl = "https://worldometers-clone.web.app";

var indexFunctions = require("./index");

describe("Worldometer Tests", async () => {
  let WorldometerService = indexFunctions.WorldometerService;

  it("should open the Worldometer website", async () => {
    result = await WorldometerService.open();
    assert.equal(
      "Worldometer - real time world statistics",
      result.title,
      "Error getting the title"
    );
    expect(result).toMatchSnapshot();
  });

  it("should return the world current population and deaths today", async () => {
    result = await WorldometerService.getCurrentWorldPopulationAndDeathsToday();
    assert.equal(
      "7,952,437,566",
      result.worldPopulation,
      "Error getting the population"
    );
    assert.equal(
      "69,103",
      result.deathsCount,
      "Error getting the deaths count"
    );
    expect(result).toMatchSnapshot();
  });

  it("should click on the link 'Coronavirus updates' and return driver", async () => {
    result = await WorldometerService.clickOnCoronavirusUpdateLink();

    const newUrl = await result.driver.getCurrentUrl();
    const newTitle = await result.driver.getTitle();

    assert.equal(
      baseUrl + "/coronavirus/",
      newUrl,
      "Error getting the new URL"
    );
    assert.equal(
      "COVID Live - Coronavirus Statistics - Worldometer",
      newTitle,
      "Error getting the old"
    );
    expect(result).toMatchSnapshot();
  });

  it("should return total cases statistics", async () => {
    result = await WorldometerService.getCoronavirusStatistics();

    assert.equal(
      result.cases,
      "536,597,444",
      "Error while getting total cases statistics"
    );
    assert.equal(
      result.deathsCount,
      "6,323,428",
      "Error while getting total death statistics"
    );
    assert.equal(
      result.recoveredCount,
      "507,719,599",
      "Error while getting total recovery statistics"
    );
    expect(result).toMatchSnapshot();
  });

  it("should search the countries as in and return the text on the table", async () => {
    result = await WorldometerService.searchCountry("in");
    expect(result).toMatchSnapshot();
  });

  it("should search the countries as india and return the text on the table", async () => {
    result = await WorldometerService.searchCountry("india");
    expect(result).toMatchSnapshot();
  });

  it("should open the first country as after search 'aus' ", async () => {
    result = await WorldometerService.openFirstCountry("aus");
    expect(result).toMatchSnapshot();
  });

  it("should open the first country as after search 'den' ", async () => {
    result = await WorldometerService.openFirstCountry("den");
    expect(result).toMatchSnapshot();
  });

  it("should open the first country as after search 'indi' ", async () => {
    result = await WorldometerService.openFirstCountry("indi");
    expect(result).toMatchSnapshot();
  });

  it("should open the first country as after search 'china' ", async () => {
    result = await WorldometerService.openFirstCountry("china");
    expect(result).toMatchSnapshot();
  });
});
