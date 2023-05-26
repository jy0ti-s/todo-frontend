import { useMutation, useQueryClient } from 'react-query';
import { deleteTodo, updateTodo } from '../../api/todosApi';

function formatDateStr(str) {
  return str ? new Date(str).toLocaleDateString('en-US') : 'n/a';
}

function Todo({ todo }) {
  const {
    id,
    title,
    description,
    priority,
    category,
    created_at,
    deadline,
    completed,
  } = todo;

  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const createdStr = formatDateStr(created_at);
  const deadlineStr = formatDateStr(deadline);

  return (
    <div className="Todo-container" key={id}>
      <div className="Todo-mainSection">
        <input
          type="checkbox"
          checked={completed}
          id={id}
          onChange={(event) => {
            updateTodoMutation.mutate({ ...todo, completed: !completed });
          }}
        />
        <label className="Todo-label" htmlFor={id}>{`${title}`}</label>
        <button
          onClick={(event) => {
            deleteTodoMutation.mutate(todo);
          }}
        >
          delete
        </button>
      </div>
      <p
        style={{ gridColumn: '1 / 2', gridRow: '2 / 2' }}
      >{`Priority: ${priority}`}</p>
      <p
        style={{ gridColumn: '2 / 3', gridRow: '2 / 2' }}
      >{`Category: ${category}`}</p>
      <p
        style={{ gridColumn: '1 / 2', gridRow: '3 / 3' }}
      >{`Created: ${createdStr}`}</p>
      <p
        style={{ gridColumn: '2 / 3', gridRow: '3 / 3' }}
      >{`Deadline: ${deadlineStr}`}</p>
      {description && (
        <p
          style={{ gridColumn: '1 / 3', gridRow: '4 / 4' }}
        >{`Description: ${description}`}</p>
      )}
    </div>
  );
}

export default Todo;
