const { Key, By } = require("selenium-webdriver");

const baseUrl = "https://worldometers-clone.web.app/";

const WorldometerService = {
  open: async (driver) => {
    // user needs to open the given URL in the driver and
    // then return the title of the webpage as the object
    return { title };
  },
  getCurrentWorldPopulationAndDeathsToday: async (driver) => {
    // user needs to search for the 2 data
    // 1.  world population,
    //   2. Today deathsCount on the home page and
    // return as the object
    return {
      deathsCount,
      worldPopulation,
    };
  },

  clickOnCoronavirusUpdateLink: async (driver) => {
    // find the link as text `Coronavirus updates` on the home page and click on the link and
    // return the driver as the object
    return {
      driver,
    };
  },

  getCoronavirusStatistics: async (driver) => {
    // find the 3 data from the `Coronavirus updates` webpage

    // total cases
    // total deaths Count
    // total recovered Count

    // and return the 3 values as output in an object format

    return {
      cases,
      deathsCount,
      recoveredCount,
    };
  },

  searchCountry: async (driver, query) => {
    // find the search box just above the country-wise statics table with id 'main_table_countries_today'
    // and search the country in the search box from the `Coronavirus updates` webpage as per input(query)
    // and return the whole text of the table with id 'main_table_countries_today' as object format
    return { tableText };
  },

  openFirstCountry: async (driver, query) => {
    // find the search box just above the country-wise statics table with id 'main_table_countries_today'
    //  and search the country in the search box from the `Coronavirus updates` webpage
    // and click on the first country link in the table with id 'main_table_countries_today' after performing a search.
    // please wait until the webpage is fully loaded for a specific country which we clicked
    // and return the 3 data from the new open webpage as
    // total cases
    // total deaths Count
    // total recovered Count
    // and return the 3 values as output in an object format then

    // return back to the previous page.

    return {
      cases,
      deathsCount,
      recoveredCount,
    };
  },
};

module.exports = {
  WorldometerService,
};
