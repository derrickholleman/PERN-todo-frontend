import './App.css';
import InputTodo from './Components/InputTodo';
import EditTodo from './Components/EditTodo'
import ListTodo from './Components/ListTodo'

function App() {
  return (
    <div className="App">
      <InputTodo />
      <ListTodo />
    </div>
  );
}

export default App;
