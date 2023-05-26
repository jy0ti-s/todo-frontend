import { useMutation, useQueryClient } from 'react-query';
import { addTodo } from '../../api/todosApi';
import { useState } from 'react';
import { PRIORITY_OPTIONS, CATEGORY_OPTIONS } from '../../constants';

function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(PRIORITY_OPTIONS[0]);
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [deadline, setDeadline] = useState('');

  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodoMutation.mutate({
      title,
      description,
      priority,
      category,
      deadline: deadline || null,
    });
    setTitle('');
    setDescription('');
    setPriority(PRIORITY_OPTIONS[0]);
    setCategory(CATEGORY_OPTIONS[0]);
    setDeadline('');
  };

  return (
    <div className="TodoForm">
      <h1>New Todo</h1>
      <form onSubmit={handleSubmit}>
        <div className="formInputWrapper">
          <label className="formLabel" htmlFor="title-input">
            Title
          </label>
          <input
            id="title-input"
            className="formInput"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="formInputWrapper">
          <label className="formLabel" htmlFor="description-input">
            Description
          </label>
          <input
            id="description-input"
            className="formInput"
            type="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div className="formInputWrapper">
          <label className="formLabel" htmlFor="priority-select">
            Priority
          </label>
          <select
            id="priority-select"
            className="formInput"
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value);
            }}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="formInputWrapper">
          <label className="formLabel" htmlFor="category-select">
            Category
          </label>
          <select
            id="category-select"
            className="formInput"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="formInputWrapper">
          <label className="formLabel" htmlFor="deadline-input">
            Deadline
          </label>
          <input
            id="deadline-input"
            className="formInput"
            type="date"
            value={deadline}
            onChange={(event) => {
              setDeadline(event.target.value);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TodoForm;
