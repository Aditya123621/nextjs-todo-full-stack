'use client';

import { Todo, UpdateTodoRequest } from '@/types/todo';
import TodoItem from './TodoItem';
import { CheckCircle2 } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: UpdateTodoRequest) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export default function TodoList({ todos, onUpdate, onDelete, isLoading = false }: TodoListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border-l-4 border-l-gray-300 p-4 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-500 mb-2">No todos found</h3>
        <p className="text-gray-400">
          Create your first todo to get started, or adjust your filters to see more results.
        </p>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div>
      {totalCount > 0 && (
        <div className="mb-4 text-sm text-gray-600">
          {completedCount} of {totalCount} todos completed
        </div>
      )}
      
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
