import { useStore } from '../store/useStore';

export function useTasks() {
  const tasks = useStore((state) => state.tasks);
  const habits = useStore((state) => state.habits);
  const teamMembers = useStore((state) => state.teamMembers);
  const comments = useStore((state) => state.comments);

  const addTask = useStore((state) => state.addTask);
  const updateTask = useStore((state) => state.updateTask);
  const deleteTask = useStore((state) => state.deleteTask);
  const moveTask = useStore((state) => state.moveTask);

  const addHabit = useStore((state) => state.addHabit);
  const toggleHabit = useStore((state) => state.toggleHabit);
  const deleteHabit = useStore((state) => state.deleteHabit);

  const addComment = useStore((state) => state.addComment);
  const addTeamMember = useStore((state) => state.addTeamMember);

  return {
    tasks,
    habits,
    teamMembers,
    comments,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    addHabit,
    toggleHabit,
    deleteHabit,
    addComment,
    addTeamMember,
  };
}
