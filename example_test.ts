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

// Test xóa tất cả các todo đã hoàn thành
Scenario("Xóa tất cả các todo đã hoàn thành", async ({ I }) => {
  I.fillField(".new-todo", "Todo 1");
  I.pressKey("Enter");
  I.fillField(".new-todo", "Todo 2");
  I.pressKey("Enter");

  I.click(locate(".todo-list li").first().find(".toggle")); // Hoàn thành Todo 1

  I.click("Clear completed"); // Xóa tất cả todo đã hoàn thành

  I.dontSee("Todo 1", ".todo-list");
  let todosLeft = await I.grabNumberOfVisibleElements(".todo-list li");
  assert.strictEqual(todosLeft, 1, "Chỉ còn 1 todo chưa hoàn thành!");
});

// Test bộ đếm số lượng công việc còn lại
Scenario("Kiểm tra bộ đếm số lượng công việc còn lại", async ({ I }) => {
  I.fillField(".new-todo", "Task 1");
  I.pressKey("Enter");
  I.fillField(".new-todo", "Task 2");
  I.pressKey("Enter");

  I.see("2 items left", ".todo-count");

  I.click(locate(".todo-list li").first().find(".toggle")); // Đánh dấu Task 1 là hoàn thành

  I.see("1 item left", ".todo-count");
});
