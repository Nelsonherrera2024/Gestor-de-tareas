import React, { useState } from 'react';

function TaskItem({ task, onDelete, onEdit, onToggleComplete }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className="task-category">{task.category}</span>
      </div>
      <div className="task-dates">
        <p>Creada: {new Date(task.createdAt).toLocaleDateString()}</p>
        <p><strong>Fecha de Vencimiento:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      {task.description && (
        <div className="task-description">
          <button onClick={() => setShowDescription(!showDescription)} className="description-toggle">
            {showDescription ? 'Ocultar descripción' : 'Mostrar descripción'}
          </button>
          {showDescription && <p>{task.description}</p>}
        </div>
      )}
      {task.completed && task.completedAt && (
        <p className="completion-date">
          Completada: {new Date(task.completedAt).toLocaleString()}
        </p>
      )}
      <div className="task-actions">
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          Completada
        </label>
        <button onClick={() => onEdit(task)} className="edit-btn">Editar</button>
        <button onClick={() => onDelete(task.id)} className="delete-btn">Eliminar</button>
      </div>
    </div>
  );
}

export default TaskItem;
