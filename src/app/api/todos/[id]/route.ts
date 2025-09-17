import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

// Validation schema for updating todos
const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long').optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  due_date: z.string().optional(),
  category: z.string().optional(),
});

// GET /api/todos/[id] - Get a single todo
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: todo, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Todo not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching todo:', error);
      return NextResponse.json(
        { error: 'Failed to fetch todo' },
        { status: 500 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/todos/[id] - Update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = updateTodoSchema.parse(body);

    const { data: todo, error } = await supabase
      .from('todos')
      .update(validatedData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Todo not found' },
          { status: 404 }
        );
      }
      console.error('Error updating todo:', error);
      return NextResponse.json(
        { error: 'Failed to update todo' },
        { status: 500 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting todo:', error);
      return NextResponse.json(
        { error: 'Failed to delete todo' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
