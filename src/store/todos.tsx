import { createContext, useContext, useState, type ReactNode } from "react";

// Create Context
// Provide
// Consumer


export type TodosProviderProps = {
    children : ReactNode //---> Children can be any type
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddTodo:(task:string) => void;
    toggleTodoAsCompleted:(id:string) => void;
    handleDeleteTodo:(id:string) => void;
}

export const todoContext = createContext<TodosContext | null >(null)

export const TodosProvider = ({children}: TodosProviderProps) => {

    const [todos, setTodo] = useState<Todo[]>(() => {
        try{
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[]
        } catch(error){
            return [];
        }
    })

    //! call signature
    const handleAddTodo = (task:string) => {
        setTodo((prev) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                }, 
                ...prev
            ]
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        })
    }

    //* mark completed  
    const toggleTodoAsCompleted = (id:string) => {
        setTodo((prev) => {
            let newTodos = prev.map((todo) => {
                if(todo.id === id){
                    return { ...todo, completed:!todo.completed}
                }
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        })
    }

    //* Deleted
    const handleDeleteTodo = (id:string) => {
        setTodo((prev) => {
            let newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        })
    }

    return <todoContext.Provider value={{todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo}}>
        {children}
    </todoContext.Provider>
}

// consumer
export const useTodos = () => {
    const todosConsumer = useContext(todoContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of Provider");
    }
    return todosConsumer;
}
