import AddToDo from "./components/AddToDo"
import Navbar from "./components/Navbar"
import Todo from "./components/Todo"
import "./App.css"

const App = () => {
  return (
    <main>
      <Navbar/>
      <h1>TODO React + Typescript</h1>
      <AddToDo />
      <Todo/>
    </main>
  )
}

export default App
