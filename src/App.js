import './App.css';
import TodoForm from './features/todos/TodoForm';
import TodoList from './features/todos/TodoList';

function App() {
  return (
    <div className="App">
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
