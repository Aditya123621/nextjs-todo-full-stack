'use client';

import { useState } from 'react';
import { Check, Edit, Trash2, Calendar, Flag, Tag } from 'lucide-react';
import { Todo, UpdateTodoRequest } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: UpdateTodoRequest) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await onUpdate(todo.id, { completed: !todo.completed });
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;
    
    setIsLoading(true);
    try {
      await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsLoading(true);
      try {
        await onDelete(todo.id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
        setIsLoading(false);
      }
    }
  };

  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  };

  const priorityBgColors = {
    low: 'bg-green-100',
    medium: 'bg-yellow-100',
    high: 'bg-red-100',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !todo.completed;

  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 p-4 transition-all ${
      todo.completed 
        ? 'border-l-green-500 opacity-75' 
        : isOverdue 
          ? 'border-l-red-500' 
          : 'border-l-blue-500'
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          disabled={isLoading}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-1 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
                rows={2}
                className="w-full px-3 py-1 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                disabled={isLoading}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  disabled={!editTitle.trim() || isLoading}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditTitle(todo.title);
                    setEditDescription(todo.description || '');
                  }}
                  disabled={isLoading}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className={`text-lg font-medium ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`mt-1 text-sm ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
                }`}>
                  {todo.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityBgColors[todo.priority]} ${priorityColors[todo.priority]}`}>
                  <Flag size={12} />
                  {todo.priority}
                </span>
                
                {todo.category && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    <Tag size={12} />
                    {todo.category}
                  </span>
                )}
                
                {todo.due_date && (
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    isOverdue ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <Calendar size={12} />
                    {formatDate(todo.due_date)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit todo"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete todo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
