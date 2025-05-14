import React from 'react';
import { CheckCircleIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const Todo = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <div className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-2 ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(todo._id)}
          className={`flex-shrink-0 ${
            todo.completed ? 'text-green-500' : 'text-gray-300'
          }`}
        >
          <CheckCircleIcon className="h-6 w-6" />
        </button>
        <div>
          <h3 className={`text-lg font-medium ${
            todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm ${
              todo.completed ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(todo)}
          className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Todo; 