Feature("Wikipedia");

Scenario("Kiểm tra trang chủ Wikipedia", async ({ I }) => {
  I.amOnPage("https://www.wikipedia.org/");
  I.see("Wikipedia");
});

Scenario("Tìm kiếm bài viết trên Wikipedia", async ({ I }) => {
  I.amOnPage("https://www.wikipedia.org/");
  I.waitForElement('input[name="search"]', 5);
  I.fillField('input[name="search"]', "Automation Testing");
  I.click('button[type="submit"]');
  I.seeInCurrentUrl("/wiki/Automation_testing");
  I.waitForText("Automation testing", 10);
  I.see("Automation testing");
});
