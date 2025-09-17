'use client';

import { useState, useEffect, useCallback } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import { Todo, CreateTodoRequest, UpdateTodoRequest, TodoFilter, TodoSort } from '@/types/todo';
import { CheckSquare } from 'lucide-react';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<TodoSort>('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch todos from API
  const fetchTodos = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        filter,
        search,
        sort,
        order,
      });

      const response = await fetch(`/api/todos?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filter, search, sort, order]);

  // Add new todo
  const handleAddTodo = async (todoData: CreateTodoRequest) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const newTodo = await response.json();
      setTodos(prevTodos => [newTodo, ...prevTodos]);
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  };

  // Update todo
  const handleUpdateTodo = async (id: string, updates: UpdateTodoRequest) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  // Fetch todos on component mount and when filters change
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          </div>
          <p className="text-gray-600">
            Stay organized and productive with your personal todo manager
          </p>
        </header>

        {/* Add Todo Form */}
        <AddTodoForm onAddTodo={handleAddTodo} />

        {/* Filter Bar */}
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          order={order}
          onOrderChange={setOrder}
        />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
          isLoading={isLoading}
        />

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with Next.js, Supabase, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}