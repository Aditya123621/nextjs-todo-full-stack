'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { TodoFilter, TodoSort } from '@/types/todo';

interface FilterBarProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  search: string;
  onSearchChange: (search: string) => void;
  sort: TodoSort;
  onSortChange: (sort: TodoSort) => void;
  order: 'asc' | 'desc';
  onOrderChange: (order: 'asc' | 'desc') => void;
}

export default function FilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
  order,
  onOrderChange,
}: FilterBarProps) {
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [localSearch, onSearchChange]);

  // Sync local state with prop when search prop changes externally
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);
  const filterOptions: { value: TodoFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  const sortOptions: { value: TodoSort; label: string }[] = [
    { value: 'created_at', label: 'Created' },
    { value: 'due_date', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search todos..."
            className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange(option.value)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  filter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as TodoSort)}
            className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => onOrderChange(order === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title={`Sort ${order === 'asc' ? 'descending' : 'ascending'}`}
          >
            {order === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </div>
  );
}
