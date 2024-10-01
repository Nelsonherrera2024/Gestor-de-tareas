import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const CATEGORIES = ['Personal', 'Trabajo', 'Tiempo libre', 'Deporte', 'Otras'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(null);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, completedAt: task.completed ? null : new Date().toISOString() } 
        : task
    ));
  };

  const handleSearch = () => {
    // La búsqueda ya se realiza en tiempo real
    console.log("Buscando:", searchTerm);
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === '' || task.category === filterCategory)
  );

  return (
    <div className="app">
      <h1>Gestor de Tareas</h1>
      <div className="filters">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar tarea..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">Buscar</button>
        </div>
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="category-filter"
        >
          <option value="">Todas las categorías</option>
          {CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <TaskForm 
        onSubmit={editingTask ? updateTask : addTask} 
        initialTask={editingTask} 
        categories={CATEGORIES}
      />
      <TaskList 
        tasks={filteredTasks} 
        onDelete={deleteTask} 
        onEdit={editTask} 
        onToggleComplete={toggleComplete} 
      />
    </div>
  );
}

export default App;
