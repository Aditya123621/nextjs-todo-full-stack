# Full-Stack Next.js Todo Application Setup Guide

This is a complete todo application built with Next.js, Supabase, and Tailwind CSS.

## Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete todos
- 🔍 **Search & Filter** - Find todos quickly with search and filtering options
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean design with Tailwind CSS
- ⚡ **Real-time Ready** - Built with Supabase for real-time capabilities
- 📝 **Rich Todo Properties** - Title, description, priority, due date, categories
- 🎯 **Smart Sorting** - Sort by date created, due date, priority, or title

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed, but if needed:

```bash
npm install
```

### 2. Set up Supabase

1. **Create a Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be ready

2. **Get Your Credentials**
   - Go to Settings → API
   - Copy your Project URL and anon public key

3. **Create Environment Variables**
   
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Create the Database Schema**
   
   In your Supabase dashboard, go to the SQL Editor and run the SQL from `src/lib/database-schema.sql`:

   ```sql
   -- Copy and paste the content from src/lib/database-schema.sql
   ```

### 3. Run the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your todo application!

## Project Structure

```
src/
├── app/
│   ├── api/todos/          # API routes for CRUD operations
│   ├── components/         # React components
│   │   ├── AddTodoForm.tsx # Form to add new todos
│   │   ├── TodoItem.tsx    # Individual todo item component
│   │   ├── TodoList.tsx    # List container for todos
│   │   └── FilterBar.tsx   # Search and filter controls
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Main todo application page
├── lib/
│   ├── supabase.ts        # Supabase client configuration
│   └── database-schema.sql # Database schema for Supabase
└── types/
    └── todo.ts            # TypeScript type definitions
```

## API Endpoints

- `GET /api/todos` - List todos with optional filtering and sorting
- `POST /api/todos` - Create a new todo
- `GET /api/todos/[id]` - Get a specific todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

## Database Schema

The application uses a single `todos` table with the following structure:

- `id` (UUID) - Primary key
- `title` (TEXT) - Todo title (required)
- `description` (TEXT) - Optional description
- `completed` (BOOLEAN) - Completion status
- `priority` (TEXT) - Priority level (low, medium, high)
- `due_date` (TIMESTAMPTZ) - Optional due date
- `category` (TEXT) - Optional category
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **Validation**: Zod
- **Icons**: Lucide React

## Customization

The application follows the Cursor rules defined in `.cursor/rules/fullstack-nextjs-todo.mdc`. You can customize:

- Add authentication with Supabase Auth
- Enable real-time updates with Supabase subscriptions
- Add more todo properties (tags, attachments, etc.)
- Implement user-specific todos
- Add collaborative features

## Development

The project is set up with:

- ESLint for code linting
- TypeScript for type safety
- Responsive design patterns
- Error handling and loading states
- Input validation on both client and server

Happy coding! 🚀
