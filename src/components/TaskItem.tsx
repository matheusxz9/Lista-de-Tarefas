import type { Task } from '../types/Task'

interface Props {
  task: Task
  toggleTask: (id: number) => void
  deleteTask: (id: number) => void
}

function TaskItem({ task, toggleTask, deleteTask }: Props) {
  return (
    <div>
      <span
        onClick={() => toggleTask(task.id)}
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
      >
        {task.title}
      </span>

      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  )
}

export default TaskItem