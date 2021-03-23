const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");
const { Builder, By, Capabilities, Key } = require("selenium-webdriver");
const { expect } = require("chai");

const driver = new Builder().forBrowser("chrome").build();

Given("I am on the Google search page", async function () {
  await driver.get("https://www.google.com");
});

When("I search for {string}", async function (searchTerm) {
  driver.findElement(By.name("q")).sendKeys(searchTerm, Key.ENTER);
});

Then(
  "Then the page title should start with {string}",
  { timeout: 60 * 1000 },
  async function (searchTerm) {
    const title = await driver.getTitle();
    const isTitleStartWithCheese =
      title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;

    expect(isTitleStartWithCheese).to.be.true;
  }
);

AfterAll({}, async function () {
  driver.quit();
});
