Feature("Google Search");

Scenario("Tìm kiếm trên Google", async ({ I }) => {
  I.amOnPage("https://www.google.com");
  I.fillField('input[name="q"]', "CodeCeptJS");
  I.pressKey("Enter");
  I.waitForText("CodeceptJS", 5);
  I.see("CodeceptJS");
});
