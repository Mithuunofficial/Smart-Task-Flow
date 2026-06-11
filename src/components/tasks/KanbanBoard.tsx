import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { Task } from '../../store/useStore';
import TaskCard from './TaskCard';

interface KanbanBoardProps {
  filteredTasks: Task[];
  openEditModal: (task: Task) => void;
  handleDeleteTask: (id: string) => void;
}

export default function KanbanBoard({
  filteredTasks,
  openEditModal,
  handleDeleteTask
}: KanbanBoardProps) {
  const { updateTask } = useStore();
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggingTaskId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Task['status']) => {
    if (draggingTaskId) {
      updateTask(draggingTaskId, { status });
      setDraggingTaskId(null);
    }
  };

  const columns: { title: Task['status']; color: string; bg: string }[] = [
    { title: 'To Do', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { title: 'In Progress', color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
    { title: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {columns.map((col) => {
        const colTasks = filteredTasks.filter((t) => t.status === col.title);
        return (
          <div
            key={col.title}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col.title)}
            className="glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/25 flex flex-col min-h-[550px] relative overflow-hidden"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.title === 'Completed' ? 'bg-emerald-400' : col.title === 'In Progress' ? 'bg-brand-purple' : 'bg-indigo-400'}`} />
                <span className="text-xs font-bold text-white uppercase tracking-wider">{col.title}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.bg} ${col.color}`}>
                {colTasks.length}
              </span>
            </div>

            {/* Task Cards Column */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[600px]">
              {colTasks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-white/5 rounded-xl">
                  <p className="text-[10px] text-slate-500">Drop or create tasks here</p>
                </div>
              ) : (
                colTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    draggingTaskId={draggingTaskId}
                    onDragStart={handleDragStart}
                    openEditModal={openEditModal}
                    handleDeleteTask={handleDeleteTask}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
