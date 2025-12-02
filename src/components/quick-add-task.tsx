import { useState } from 'react'

/**
 * Interface for quick-add task submission
 */
interface QuickAddTaskProps {
  onSubmit: (taskInput: string) => void | Promise<void>
  placeholder?: string
  disabled?: boolean
}

/**
 * QuickAddTask Component
 *
 * A minimal, fast task capture input component optimized for rapid task creation.
 * Features:
 * - Text input field for task description
 * - Submit button with send icon
 * - Enter key submission support
 * - Loading state handling
 * - Brand color styling (#4B2FFF primary, #FFB800 accent)
 *
 * @param onSubmit - Callback function when task is submitted
 * @param placeholder - Custom placeholder text
 * @param disabled - Whether the input is disabled
 */
export function QuickAddTask({
  onSubmit,
  placeholder = 'Add a new task...',
  disabled = false,
}: QuickAddTaskProps) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handle form submission
   * Clears input after successful submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim() || isLoading || disabled) {
      return
    }

    try {
      setIsLoading(true)
      await onSubmit(input)
      setInput('')
    } catch (error) {
      console.error('Error adding task:', error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle Enter key press for quick submission
   * Shift+Enter can be used for multiline input if needed in future
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true }))
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex gap-2 items-center p-4 rounded-lg border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all hover:border-[#4B2FFF] dark:hover:border-[#4B2FFF] focus-within:border-[#4B2FFF] focus-within:shadow-lg focus-within:shadow-[#4B2FFF]/20"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-600 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Task input"
      />

      <button
        type="submit"
        disabled={!input.trim() || isLoading || disabled}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-white bg-[#4B2FFF] hover:bg-[#3d24cc] active:bg-[#2f1aa3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#4B2FFF] min-w-max"
        aria-label="Add task"
      >
        {isLoading ? (
          <>
            <span className="animate-spin inline-block">⏳</span>
            <span className="text-sm">Adding...</span>
          </>
        ) : (
          <>
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
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span className="text-sm">Add</span>
          </>
        )}
      </button>
    </form>
  )
}
