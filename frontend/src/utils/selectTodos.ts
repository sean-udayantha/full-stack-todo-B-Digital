import type { Todo, TodoFilter, TodoSort } from '../types/todo';

export function selectVisibleTodos(todos: Todo[], filter: TodoFilter, search: string, sort: TodoSort) {
  const query = search.trim().toLocaleLowerCase();
  return todos.filter((todo) => {
    const matchesFilter = filter === 'all' || (filter === 'completed' ? todo.done : !todo.done);
    const matchesSearch = `${todo.title} ${todo.description}`.toLocaleLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sort === 'alphabetical') return a.title.localeCompare(b.title) || a.id - b.id;
    const timeDifference = Date.parse(b.createdAt) - Date.parse(a.createdAt) || b.id - a.id;
    return sort === 'oldest' ? -timeDifference : timeDifference;
  });
}
