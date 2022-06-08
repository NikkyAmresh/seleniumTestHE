require("chromedriver");
const { Builder, Key, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver1eebc8c");
const firefox = require("selenium-webdriver/firefox");

const screen = {
  width: 640,
  height: 480,
};

let driver;

before(async function () {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        .addArguments("--headless")
        .addArguments("--no-sandbox")
        .addArguments("--disable-dev-shm-usage")
        .windowSize(screen)
    )
    .setChromeService(service)
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();
});

until.elementIsNotPresent = function elementIsNotPresent(locator) {
  return new until.Condition(
    "for no element to be located " + locator,
    function (driver) {
      return driver.findElements(locator).then(function (elements) {
        return elements.length == 0;
      });
    }
  );
};

const baseUrl = "https://worldometers-clone.web.app/";
// const baseUrl = "http://localhost:8000/";

const WorldometerService = {
  open: async () => {
    await driver.get(baseUrl);
    const title = await driver.getTitle();
    return { title };
  },
  getCurrentWorldPopulationAndDeathsToday: async () => {
    let worldPopulation = await driver.findElement(
      By.xpath('//*[@id="c1"]/div[1]/span[1]/span')
    );
    let deathsCount = await driver.findElement(
      By.xpath("/html/body/div[4]/div[2]/div[2]/div[1]/div[2]/div[6]/span[1]")
    );
    return {
      deathsCount: await deathsCount.getText(),
      worldPopulation: await worldPopulation.getText(),
    };
  },

  clickOnCoronavirusUpdateLink: async () => {
    let link = await driver.findElement(
      By.xpath("/html/body/div[4]/div[2]/div[2]/div[1]/div[1]/a")
    );
    await link.click();
    return {
      driver,
    };
  },

  getCoronavirusStatistics: async () => {
    let cases = await driver.findElement(
      By.xpath('//*[@id="maincounter-wrap"]/div/span')
    );
    let deathsCount = await driver.findElement(
      By.xpath("/html/body/div[3]/div[2]/div[1]/div/div[6]/div/span")
    );
    let recoveredCount = await driver.findElement(
      By.xpath("/html/body/div[3]/div[2]/div[1]/div/div[7]/div/span")
    );
    return {
      cases: await cases.getText(),
      deathsCount: await deathsCount.getText(),
      recoveredCount: await recoveredCount.getText(),
    };
  },

  searchCountry: async (query) => {
    let searchBox = await driver.findElement(
      By.xpath('//*[@id="main_table_countries_today_filter"]/label/input')
    );
    await driver.executeScript(
      "return arguments[0].scrollIntoView();",
      searchBox
    );
    await driver.sleep(300);
    await searchBox.click();
    await searchBox.clear();
    await searchBox.sendKeys(query, Key.RETURN);
    let tableCountries = await driver.findElement(
      By.xpath('//*[@id="main_table_countries_today"]')
    );
    return { tableText: await tableCountries.getText() };
  },

  openFirstCountry: async (query) => {
    await WorldometerService.searchCountry(query);
    const firstCountryLink = await driver.findElement(
      By.xpath(
        "/html/body/div[3]/div[3]/div/div[6]/div[1]/div/table/tbody[1]/tr/td[2]/a"
      )
    );
    await firstCountryLink.click();

    let cases = await driver.findElement(
      By.xpath("/html/body/div[3]/div[2]/div[1]/div/div[4]/div/span")
    );
    let deathsCount = await driver.findElement(
      By.xpath("/html/body/div[3]/div[2]/div[1]/div/div[5]/div/span")
    );
    let recoveredCount = await driver.findElement(
      By.xpath("/html/body/div[3]/div[2]/div[1]/div/div[6]/div/span")
    );

    const result = {
      cases: await cases.getText(),
      deathsCount: await deathsCount.getText(),
      recoveredCount: await recoveredCount.getText(),
    };
    driver.navigate().back();
    return result;
  },
};

after(() => driver && driver.quit());

module.exports = {
  WorldometerService,
};
