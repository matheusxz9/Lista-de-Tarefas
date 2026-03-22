import { useState } from 'react'

interface Props {
  addTask: (title: string) => void
}

function TaskInput({ addTask }: Props) {
  const [title, setTitle] = useState('')

  const handleAdd = () => {
    if (!title) return
    addTask(title)
    setTitle('')
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button onClick={handleAdd}>Adicionar</button>
    </div>
  )
}

export default TaskInput