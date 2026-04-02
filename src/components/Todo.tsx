import { useTodos } from '../store/todos';
import { useSearchParams } from 'react-router-dom';

const Todo = () => {
    const {todos, toggleTodoAsCompleted, handleDeleteTodo} = useTodos();
    const [searchParams] = useSearchParams();
    let todosData = searchParams.get("todos");
    console.log("file: ", todosData)

    let filterData = todos;

    if(todosData === "active"){
        filterData = filterData.filter((task) => !task.completed)
    } 

    if(todosData === "completed"){
        filterData = filterData.filter((task) => task.completed)
    }
    
  return (
    <ul>
        {
            filterData.map((todos) => {
                return <li key={todos.id}>
                    <input type="checkbox" name="" id={`todo-${todos.id}`} checked={todos.completed} onChange={() => toggleTodoAsCompleted(todos.id)} />
                    <label htmlFor={`todo-${todos.id}`}>{todos.task}</label>

                    {
                        todos.completed && (
                            <button type='button' onClick={() => handleDeleteTodo(todos.id)}>Delete</button>
                        )
                    }
                </li>
            })
        }
    </ul>
  )
}

export default Todo
