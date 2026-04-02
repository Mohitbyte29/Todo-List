import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TodosProvider } from './store/todos.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <TodosProvider>
      <App />
    </TodosProvider>
    </BrowserRouter>,
)


