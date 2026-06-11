import { Calendar, Trash2, Edit3, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import type { Task } from '../../store/useStore';

interface TaskCardProps {
  task: Task;
  draggingTaskId: string | null;
  onDragStart: (id: string) => void;
  openEditModal: (task: Task) => void;
  handleDeleteTask: (id: string) => void;
}

export default function TaskCard({
  task,
  draggingTaskId,
  onDragStart,
  openEditModal,
  handleDeleteTask
}: TaskCardProps) {
  const { updateTask } = useStore();
  const isOverdue = new Date(task.dueDate).getTime() < new Date().getTime() && task.status !== 'Completed';

  return (
    <motion.div
      layoutId={task.id}
      draggable
      onDragStart={() => onDragStart(task.id)}
      className={`p-4 bg-brand-card border border-white/5 rounded-xl shadow-md cursor-grab active:cursor-grabbing hover:border-brand-purple/20 transition-all text-left space-y-3 relative group overflow-hidden ${
        draggingTaskId === task.id ? 'opacity-30' : ''
      }`}
    >
      {/* Interactive glow overlay */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Header details */}
      <div className="flex justify-between items-start gap-1">
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
          task.priority === 'High'
            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/5'
            : task.priority === 'Medium'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/5'
              : 'bg-slate-800 text-slate-400'
        }`}>
          {task.priority} Priority
        </span>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => openEditModal(task)}
            className="p-1 hover:text-white text-slate-500 rounded hover:bg-white/5"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="p-1 hover:text-rose-400 text-slate-500 rounded hover:bg-white/5"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">{task.title}</h4>
        <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{task.description}</p>
      </div>

      {/* Metadata Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] text-slate-500">
        <span className={`flex items-center gap-1 font-semibold ${isOverdue ? 'text-rose-400' : 'text-slate-400'}`}>
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          {task.dueDate}
        </span>
        
        <span className="bg-white/5 px-1.5 py-0.5 rounded text-slate-400 uppercase font-bold tracking-wider">
          {task.category}
        </span>
      </div>

      {/* Mobile accessibility quick-move action controls */}
      <div className="flex items-center justify-end gap-1.5 pt-1.5 opacity-0 group-hover:opacity-100 transition-opacity lg:hidden">
        {task.status !== 'To Do' && (
          <button
            onClick={() => updateTask(task.id, { status: task.status === 'Completed' ? 'In Progress' : 'To Do' })}
            className="p-1 rounded bg-slate-900 border border-white/5 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-3 h-3" />
          </button>
        )}
        {task.status !== 'Completed' && (
          <button
            onClick={() => updateTask(task.id, { status: task.status === 'To Do' ? 'In Progress' : 'Completed' })}
            className="p-1 rounded bg-slate-900 border border-white/5 text-slate-400 hover:text-white"
          >
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
