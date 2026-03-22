import { useState, useEffect } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import type { Task } from './types/Task'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  // Carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }, [])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  )
}

export default App