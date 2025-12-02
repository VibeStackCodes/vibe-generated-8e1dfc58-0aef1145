import { useState } from 'react'
import { QuickAddTask } from '@/components/quick-add-task'
import { TaskDetailModal, type Task, type TaskPriority } from '@/components/task-detail-modal'
import { TagsDisplay } from '@/components/tags-display'

/**
 * Interface for task item structure - mapped from Task type for compatibility
 */
interface TaskItem extends Task {
  text?: string // Legacy field, maps to title
}

/**
 * HomePage Component
 *
 * Demonstrates the QuickAddTask component with:
 * - Fast task capture input
 * - Task list display
 * - Task completion toggle
 * - Task deletion
 * - Local state management
 */
export function HomePage() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  /**
   * Handle new task submission from QuickAddTask
   * Simulates minimal delay to demonstrate loading state
   */
  const handleAddTask = async (taskInput: string) => {
    // Simulate a brief network/processing delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: taskInput,
      text: taskInput, // Keep for compatibility
      description: undefined,
      priority: 'medium' as TaskPriority,
      tags: [],
      completed: false,
      createdAt: new Date(),
    }

    setTasks((prevTasks) => [newTask, ...prevTasks])
  }

  /**
   * Toggle task completion status
   */
  const handleToggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  /**
   * Delete a task by ID
   */
  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  /**
   * Open task detail modal for editing
   */
  const handleOpenTaskDetails = (task: TaskItem) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  /**
   * Close task detail modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  /**
   * Save updated task from modal
   */
  const handleSaveTask = async (updatedTask: Task) => {
    // Simulate a brief network/processing delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id
          ? { ...updatedTask, text: updatedTask.title }
          : task
      )
    )
  }

  /**
   * Delete task from modal
   */
  const handleDeleteFromModal = async (taskId: string) => {
    // Simulate a brief network/processing delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    handleDeleteTask(taskId)
  }

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            NoTODO
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fast capture, zero friction. Your tasks, organized.
          </p>
        </div>

        {/* Quick Add Task Input */}
        <div className="mb-8">
          <QuickAddTask
            onSubmit={handleAddTask}
            placeholder="What do you need to do? Add a task..."
          />
        </div>

        {/* Task Stats */}
        {tasks.length > 0 && (
          <div className="mb-6 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>
              <strong className="text-gray-900 dark:text-gray-50">
                {tasks.length}
              </strong>{' '}
              {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
            {completedCount > 0 && (
              <span>
                <strong className="text-gray-900 dark:text-gray-50">
                  {completedCount}
                </strong>{' '}
                completed
              </span>
            )}
          </div>
        )}

        {/* Task List */}
        {tasks.length > 0 ? (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="group flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                onClick={() => handleOpenTaskDetails(task)}
              >
                {/* Completion Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleTask(task.id)
                  }}
                  className="flex-shrink-0 transition-colors hover:text-[#4B2FFF]"
                  aria-label={
                    task.completed ? 'Mark incomplete' : 'Mark complete'
                  }
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={task.completed ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={
                      task.completed
                        ? 'text-[#4B2FFF]'
                        : 'text-gray-400 dark:text-gray-600'
                    }
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </button>

                {/* Task Text */}
                <span
                  className={`flex-1 text-base transition-all ${
                    task.completed
                      ? 'text-gray-400 dark:text-gray-600 line-through'
                      : 'text-gray-900 dark:text-gray-50'
                  }`}
                >
                  {task.title || task.text}
                </span>

                {/* Priority Badge */}
                {task.priority !== 'medium' && (
                  <span className="flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full">
                    {task.priority === 'low' && '🟢'}
                    {task.priority === 'high' && '🔴'}
                  </span>
                )}

                {/* Tags Display */}
                {task.tags && task.tags.length > 0 && (
                  <div className="flex-shrink-0">
                    <TagsDisplay
                      tags={task.tags}
                      maxDisplay={2}
                      variant="compact"
                    />
                  </div>
                )}

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteTask(task.id)
                  }}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400"
                  aria-label="Delete task"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4 text-5xl">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
              No tasks yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Add your first task above to get started. Keep it simple.
            </p>
          </div>
        )}

        {/* Task Detail Modal */}
        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveTask}
            onDelete={handleDeleteFromModal}
          />
        )}
      </div>
    </div>
  )
}
