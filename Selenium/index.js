const { Key, By } = require("selenium-webdriver");

const baseUrl = "https://worldometers-clone.web.app/";

const WorldometerService = {
  open: async (driver) => {
    await driver.get(baseUrl);
    const title = await driver.getTitle();
    return { title };
  },
  getCurrentWorldPopulationAndDeathsToday: async (driver) => {
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

  clickOnCoronavirusUpdateLink: async (driver) => {
    let link = await driver.findElement(
      By.xpath("/html/body/div[4]/div[2]/div[2]/div[1]/div[1]/a")
    );
    await link.click();
    return {
      driver,
    };
  },

  getCoronavirusStatistics: async (driver) => {
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

  searchCountry: async (driver, query) => {
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

  openFirstCountry: async (driver, query) => {
    await WorldometerService.searchCountry(driver, query);
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

module.exports = {
  WorldometerService,
};
