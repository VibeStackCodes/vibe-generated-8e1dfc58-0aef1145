import { useState, useCallback, useEffect } from 'react'
import { TagsInput } from './tags-input'

/**
 * Priority levels for tasks
 */
export type TaskPriority = 'low' | 'medium' | 'high'

/**
 * Complete task structure with all editable fields
 */
export interface Task {
  id: string
  title: string
  description?: string
  priority: TaskPriority
  tags: string[]
  completed: boolean
  createdAt: Date
  dueDate?: Date
}

/**
 * Props for TaskDetailModal component
 */
interface TaskDetailModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
  onSave: (updatedTask: Task) => void | Promise<void>
  onDelete?: (taskId: string) => void | Promise<void>
}

/**
 * TaskDetailModal Component
 *
 * A comprehensive modal for viewing and editing task details.
 * Features:
 * - Edit title and description
 * - Set priority (low/medium/high)
 * - Add/remove tags
 * - Delete task
 * - Clean, minimal UI optimized for rapid interaction
 * - Brand colors: #4B2FFF primary, #FFB800 accent
 *
 * @param task - The task to display/edit
 * @param isOpen - Whether the modal is visible
 * @param onClose - Callback when modal closes
 * @param onSave - Callback when task is saved
 * @param onDelete - Optional callback when task is deleted
 */
export function TaskDetailModal({
  task,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: TaskDetailModalProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [priority, setPriority] = useState<TaskPriority>(task.priority)
  const [tags, setTags] = useState<string[]>(task.tags)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  /**
   * Reset form to task values when modal opens or task changes
   */
  useEffect(() => {
    if (isOpen) {
      setTitle(task.title)
      setDescription(task.description || '')
      setPriority(task.priority)
      setTags(task.tags)
    }
  }, [isOpen, task])

  /**
   * Handle save button click
   */
  const handleSave = useCallback(async () => {
    if (!title.trim()) {
      alert('Task title cannot be empty')
      return
    }

    try {
      setIsSaving(true)
      const updatedTask: Task = {
        ...task,
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        tags,
      }
      await onSave(updatedTask)
      onClose()
    } catch (error) {
      console.error('Error saving task:', error)
    } finally {
      setIsSaving(false)
    }
  }, [title, description, priority, tags, task, onSave, onClose])

  /**
   * Handle delete button click
   */
  const handleDelete = useCallback(async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this task? This cannot be undone.'
      )
    ) {
      return
    }

    try {
      setIsDeleting(true)
      if (onDelete) {
        await onDelete(task.id)
      }
      onClose()
    } catch (error) {
      console.error('Error deleting task:', error)
    } finally {
      setIsDeleting(false)
    }
  }, [task.id, onDelete, onClose])


  if (!isOpen) return null

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              Task Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-50 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#4B2FFF] focus:shadow-lg focus:shadow-[#4B2FFF]/20 transition-all"
                disabled={isSaving || isDeleting}
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-50 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#4B2FFF] focus:shadow-lg focus:shadow-[#4B2FFF]/20 transition-all resize-none"
                disabled={isSaving || isDeleting}
              />
            </div>

            {/* Priority Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-50 mb-3">
                Priority
              </label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    disabled={isSaving || isDeleting}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all capitalize ${
                      priority === p
                        ? 'bg-[#4B2FFF] text-white shadow-lg shadow-[#4B2FFF]/30'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {p === 'low' && '🟢 Low'}
                    {p === 'medium' && '🟡 Medium'}
                    {p === 'high' && '🔴 High'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-50 mb-3">
                Tags
              </label>
              <TagsInput
                tags={tags}
                onTagsChange={setTags}
                placeholder="Add a tag..."
                maxTags={10}
                disabled={isSaving || isDeleting}
              />
            </div>

            {/* Metadata */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <div>
                Created: {task.createdAt.toLocaleDateString()} at{' '}
                {task.createdAt.toLocaleTimeString()}
              </div>
              {task.dueDate && (
                <div>
                  Due: {task.dueDate.toLocaleDateString()} at{' '}
                  {task.dueDate.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 flex gap-3 p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            {onDelete && (
              <button
                onClick={handleDelete}
                disabled={isSaving || isDeleting}
                className="px-4 py-2 rounded-lg font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
            <div className="flex-1" />
            <button
              onClick={onClose}
              disabled={isSaving || isDeleting}
              className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || isDeleting}
              className="px-4 py-2 rounded-lg font-medium text-white bg-[#4B2FFF] hover:bg-[#3d24cc] active:bg-[#2f1aa3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
