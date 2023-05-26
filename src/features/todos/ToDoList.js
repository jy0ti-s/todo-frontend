import { useQuery } from 'react-query';
import { getTodos } from '../../api/todosApi';
import Todo from './Todo';
import { useState } from 'react';

const FILTER_OPTIONS = ['all', 'done', 'not done'];

function TodoList() {
  const [filter, setFilter] = useState(FILTER_OPTIONS[0]);

  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery('todos', getTodos, {
    select: (data) =>
      data
        .filter((todo) => {
          if (filter === 'all') return true;
          if (filter === 'done') return todo.completed;
          if (filter === 'not done') return !todo.completed;
        })
        .sort((a, b) => b.id - a.id),
  });

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = todos?.map((todo) => {
      return <Todo key={todo.id} todo={todo} />;
    });
  }

  return (
    <div className="TodoList">
      <h1>Todo List</h1>
      <div className="formInputWrapper">
        <label className="formLabel" htmlFor="filter-select">
          Filter
        </label>
        <select
          id="filter-select"
          className="formInput"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        >
          {FILTER_OPTIONS.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
      {content}
    </div>
  );
}

export default TodoList;
