import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import type { Task } from './types/Task';

function App() {
  // Inicializa o estado buscando dados do localStorage de forma síncrona
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    try {
      // Converte a string JSON para array de objetos do tipo Task
      return saved ? (JSON.parse(saved) as Task[]) : [];
    } catch {
      // Retorna array vazio em caso de erro no parse do JSON
      return [];
    }
  });

  // Atualiza o armazenamento local sempre que o estado 'tasks' for modificado
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Cria uma nova tarefa e a adiciona ao final da lista atual
  const addTask = (title: string) => {
    // Impede a criação de itens sem texto
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(), // Gera ID baseado no tempo atual
      title,
      completed: false,
    };
    
    // Atualiza o estado preservando a imutabilidade do array
    setTasks((prev) => [...prev, newTask]);
  };

  // Alterna o status 'completed' da tarefa selecionada pelo ID
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Remove uma tarefa da lista filtrando pelo ID
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Lista de Tarefas</h1>
      
      {/* Componente responsável pelo campo de entrada */}
      <TaskInput addTask={addTask} />

      <div style={{ marginTop: '20px' }}>
        {/* Componente que renderiza a lista e gerencia ações de clique */}
        <TaskList 
          tasks={tasks} 
          toggleTask={toggleTask} 
          deleteTask={deleteTask} 
        />
      </div>
    </main>
  );
}

export default App;