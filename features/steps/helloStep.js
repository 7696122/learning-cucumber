const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");
const { Builder, By, Capabilities, Key } = require("selenium-webdriver");
const { expect } = require("chai");

const driver = new Builder().forBrowser("chrome").build();

Given("I am on the Google search page", async function () {
  await driver.get("http://www.google.com");
});

When("I search for {sring}", async function (searchTerm) {
  const element = await driver.findElement(By.name("q"));
  element.sendKeys(searchTerm, Key.RETERN);
  element.submit();
});

Then(
  "Then the page title should start with {sring}",
  { timeout: 60 * 1000 },
  async function (searchTerm) {
    const title = await driver.getTitle();
    const isTitleStartWithCheese =
      title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
    expect(isTitleStartWithCheese).to.equal(true);
  }
);

AfterAll("end", async function () {
  await driver.quit();
});
