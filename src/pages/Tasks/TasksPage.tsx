import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Task } from '../../store/useStore';
import KanbanBoard from '../../components/tasks/KanbanBoard';
import TaskFilter from '../../components/tasks/TaskFilter';
import TaskForm from '../../components/tasks/TaskForm';

export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useStore();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('Medium');
  const [category, setCategory] = useState<Task['category']>('Design');
  const [dueDate, setDueDate] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('2h');

  const openCreateModal = () => {
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setCategory('Design');
    setDueDate(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]); // 3 days from now
    setTimeEstimate('2h');
    setIsCreateModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setCategory(task.category);
    setDueDate(task.dueDate);
    setTimeEstimate(task.timeEstimate || '2h');
    setIsEditModalOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;
    
    addTask({
      title,
      description,
      status: 'To Do',
      priority,
      category,
      dueDate,
      timeEstimate
    });
    
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !title.trim() || !dueDate) return;

    updateTask(selectedTask.id, {
      title,
      description,
      priority,
      category,
      dueDate,
      timeEstimate
    });

    setIsEditModalOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      setIsEditModalOpen(false);
    }
  };

  // Filter and Search Tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Task Board</h1>
          <p className="text-xs text-slate-400 mt-1">Organize your sprints, track progress, and sort priorities seamlessly.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Task
        </button>
      </div>

      {/* Search & Filter Bar */}
      <TaskFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      {/* Kanban Layout */}
      <KanbanBoard
        filteredTasks={filteredTasks}
        openEditModal={openEditModal}
        handleDeleteTask={handleDeleteTask}
      />

      {/* CREATE TASK MODAL */}
      <TaskForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
        dueDate={dueDate}
        setDueDate={setDueDate}
        timeEstimate={timeEstimate}
        setTimeEstimate={setTimeEstimate}
        mode="create"
      />

      {/* EDIT TASK MODAL */}
      <TaskForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
        dueDate={dueDate}
        setDueDate={setDueDate}
        timeEstimate={timeEstimate}
        setTimeEstimate={setTimeEstimate}
        mode="edit"
        handleDeleteTask={() => selectedTask && handleDeleteTask(selectedTask.id)}
      />
    </div>
  );
}
