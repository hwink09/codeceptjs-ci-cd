const assert = require("assert");

Feature("TodoMVC");

Before(({ I }) => {
  I.amOnPage("https://demo.playwright.dev/todomvc/");
});

Scenario("Thêm một todo mới", async ({ I }) => {
  I.fillField(".new-todo", "Học CodeCeptJS");
  I.pressKey("Enter");
  I.see("Học CodeCeptJS", ".todo-list");
});

Scenario("Thêm nhiều todo và kiểm tra số lượng", async ({ I }) => {
  I.fillField(".new-todo", "Lập trình CI/CD");
  I.pressKey("Enter");
  I.fillField(".new-todo", "Học Playwright");
  I.pressKey("Enter");

  let todos = await I.grabNumberOfVisibleElements(".todo-list li");
  assert.strictEqual(todos, 2, "Số lượng todo không đúng!");
});

// Xóa một todo
Scenario("Xóa một todo", async ({ I }) => {
  I.fillField(".new-todo", "Viết test với CodeCeptJS");
  I.pressKey("Enter");

  I.waitForElement(".todo-list li", 5);
  I.moveCursorTo(".todo-list li");
  I.wait(1); // Đợi hover để nút xóa xuất hiện
  I.click(".todo-list li .destroy");

  I.wait(1); // Đợi animation xóa todo
  I.dontSeeElement(".todo-list li");
});

Scenario("Đánh dấu một todo là hoàn thành", async ({ I }) => {
  I.fillField(".new-todo", "Review CodeCeptJS");
  I.pressKey("Enter");

  I.waitForElement(".todo-list li", 5);
  I.click(".todo-list li .toggle");

  I.waitForElement(".todo-list li.completed", 5);
  let completed = await I.grabNumberOfVisibleElements(
    ".todo-list li.completed"
  );
  assert.strictEqual(completed, 1, "Todo không được đánh dấu là hoàn thành!");
});
