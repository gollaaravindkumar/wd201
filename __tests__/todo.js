const todoList = require('../todo');

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeEach(() => {
    // Clear the list before each test to avoid interference between tests
    all.length = 0;
    
    // Add some sample todos for each test
    add({
      title: "Test todo 1",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString("en-CA"),  // Overdue
    });
    add({
      title: "Test todo 2",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),  // Due today
    });
    add({
      title: "Test todo 3",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString("en-CA"),  // Due later
    });
  });

  test("Should add a new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "New Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const overdueItems = overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("Test todo 1");
  });

  test("Should retrieve due today items", () => {
    const todayItems = dueToday();
    expect(todayItems.length).toBe(1);
    expect(todayItems[0].title).toBe("Test todo 2");
  });

  test("Should retrieve due later items", () => {
    const laterItems = dueLater();
    expect(laterItems.length).toBe(1);
    expect(laterItems[0].title).toBe("Test todo 3");
  });
});
