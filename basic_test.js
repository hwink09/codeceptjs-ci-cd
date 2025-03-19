Feature("Basic Test");

Scenario("Verify Google homepage", ({ I }) => {
  I.amOnPage("https://www.google.com");
  I.see("Google");
});
