import React from 'react';
import type { Task } from '../../store/useStore';
import { Modal } from '../common/Modal';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: (t: string) => void;
  description: string;
  setDescription: (d: string) => void;
  priority: Task['priority'];
  setPriority: (p: Task['priority']) => void;
  category: Task['category'];
  setCategory: (c: Task['category']) => void;
  dueDate: string;
  setDueDate: (d: string) => void;
  timeEstimate: string;
  setTimeEstimate: (t: string) => void;
  mode: 'create' | 'edit';
  handleDeleteTask?: () => void;
}

export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  category,
  setCategory,
  dueDate,
  setDueDate,
  timeEstimate,
  setTimeEstimate,
  mode,
  handleDeleteTask
}: TaskFormProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={mode === 'create' ? "Create New Task" : "Edit Task Details"}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Task Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Write launch article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none placeholder-slate-600 text-white"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Description</label>
          <textarea
            rows={3}
            placeholder="e.g. Collaborative writeup on medium about launch features..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none placeholder-slate-600 text-white resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Task['category'])}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
            >
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Due Date</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Time Estimate</label>
            <input
              type="text"
              placeholder="e.g. 3h or 2d"
              value={timeEstimate}
              onChange={(e) => setTimeEstimate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none placeholder-slate-600 text-white"
            />
          </div>
        </div>

        {mode === 'create' ? (
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 text-white cursor-pointer"
            >
              Create Task
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={handleDeleteTask}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/10 cursor-pointer"
            >
              Delete Task
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 text-white cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}
