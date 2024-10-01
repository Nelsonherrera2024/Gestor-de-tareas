import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initialTask, categories }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setCategory(initialTask.category);
      setDueDate(initialTask.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setCategory('');
      setDueDate('');
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ 
      id: initialTask ? initialTask.id : null, 
      title, 
      description,
      category, 
      dueDate,
      createdAt: initialTask ? initialTask.createdAt : new Date().toISOString(),
    });
    setTitle('');
    setDescription('');
    setCategory('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        className="task-input"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción de la tarea"
        className="task-description"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
        required
      >
        <option value="">Selecciona una categoría</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="date-input"
        required
      />
      <button type="submit" className="submit-btn">
        {initialTask ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
}

export default TaskForm;
