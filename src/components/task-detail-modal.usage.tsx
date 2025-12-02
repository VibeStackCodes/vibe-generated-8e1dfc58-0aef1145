import { useState } from 'react'
import { TaskDetailModal, type Task } from '@/components/task-detail-modal'

/**
 * Usage example for TaskDetailModal component
 * Demonstrates how to use the modal with full task management
 */
export function TaskDetailModalUsage() {
  const [isOpen, setIsOpen] = useState(false)
  const [task, setTask] = useState<Task>({
    id: '1',
    title: 'Build task detail modal',
    description: 'Create a comprehensive modal for viewing and editing task information',
    priority: 'high',
    tags: ['feature', 'ui', 'frontend'],
    completed: false,
    createdAt: new Date('2024-01-01'),
    dueDate: new Date('2024-01-15'),
  })

  const handleSave = async (updatedTask: Task) => {
    console.log('Saving task:', updatedTask)
    setTask(updatedTask)
  }

  const handleDelete = async (taskId: string) => {
    console.log('Deleting task:', taskId)
  }

  return (
    <div className="p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-[#4B2FFF] text-white rounded-lg font-semibold hover:bg-[#3d24cc]"
      >
        Open Task Details
      </button>

      <TaskDetailModal
        task={task}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
