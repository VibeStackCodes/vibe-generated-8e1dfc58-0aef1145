/**
 * QuickAddTask Component - Usage Documentation
 * ===============================================
 *
 * The QuickAddTask component is a minimal, fast task capture input optimized for:
 * - Rapid task creation (<3 seconds)
 * - Keyboard-friendly (Enter to submit)
 * - Mobile and desktop responsive
 * - Accessibility-first design
 *
 * QUICK START
 * -----------
 * import { QuickAddTask } from '@/components/quick-add-task'
 *
 * function MyApp() {
 *   const handleAddTask = async (taskText: string) => {
 *     // Process task (save to DB, etc.)
 *     console.log('New task:', taskText)
 *   }
 *
 *   return (
 *     <QuickAddTask
 *       onSubmit={handleAddTask}
 *       placeholder="What's next?"
 *     />
 *   )
 * }
 *
 * PROPS
 * -----
 * @param onSubmit (string) => void | Promise<void>
 *   - Callback function triggered when user submits a task
 *   - Receives the task text as a string
 *   - Can be async for API calls, loading state is handled automatically
 *   - Required parameter
 *
 * @param placeholder?: string
 *   - Custom placeholder text for the input
 *   - Default: "Add a new task..."
 *   - Optional, defaults to "Add a new task..."
 *
 * @param disabled?: boolean
 *   - Disables the input and submit button
 *   - Default: false
 *   - Optional, useful for controlling availability from parent component
 *
 * FEATURES
 * --------
 * ✓ Enter key submission (fast capture)
 * ✓ Automatic loading state during submission
 * ✓ Input validation (empty strings rejected)
 * ✓ Auto-clears input after successful submission
 * ✓ Hover and focus states with brand color (#4B2FFF)
 * ✓ Dark mode support
 * ✓ Accessible (aria-labels, semantic HTML)
 * ✓ Mobile-friendly touch targets
 * ✓ Smooth animations and transitions
 *
 * STYLING
 * -------
 * The component uses:
 * - Primary brand color: #4B2FFF (purple)
 * - Tailwind CSS for styling
 * - Dark mode support with dark: prefix
 * - Smooth transitions and focus states
 * - Responsive padding and sizing
 *
 * EXAMPLE - WITH API CALL
 * -----------------------
 * function App() {
 *   const handleAddTask = async (taskText: string) => {
 *     const response = await fetch('/api/tasks', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({ text: taskText })
 *     })
 *     const task = await response.json()
 *     // Task has been created, loading state auto-handled
 *   }
 *
 *   return <QuickAddTask onSubmit={handleAddTask} />
 * }
 *
 * EXAMPLE - WITH LOCAL STATE
 * ---------------------------
 * function App() {
 *   const [tasks, setTasks] = useState<string[]>([])
 *
 *   const handleAddTask = (taskText: string) => {
 *     // Sync operation - no loading state for this example
 *     setTasks(prev => [...prev, taskText])
 *   }
 *
 *   return (
 *     <>
 *       <QuickAddTask
 *         onSubmit={handleAddTask}
 *         placeholder="Add a new task..."
 *       />
 *       <TaskList tasks={tasks} />
 *     </>
 *   )
 * }
 *
 * EXAMPLE - WITH ERROR HANDLING
 * ------------------------------
 * function App() {
 *   const [error, setError] = useState<string | null>(null)
 *   const [isDisabled, setIsDisabled] = useState(false)
 *
 *   const handleAddTask = async (taskText: string) => {
 *     try {
 *       setError(null)
 *       const response = await fetch('/api/tasks', {
 *         method: 'POST',
 *         body: JSON.stringify({ text: taskText })
 *       })
 *       if (!response.ok) throw new Error('Failed to save')
 *     } catch (err) {
 *       setError(err instanceof Error ? err.message : 'Unknown error')
 *     }
 *   }
 *
 *   return (
 *     <>
 *       <QuickAddTask
 *         onSubmit={handleAddTask}
 *         disabled={isDisabled}
 *       />
 *       {error && <div className="text-red-500">{error}</div>}
 *     </>
 *   )
 * }
 *
 * KEYBOARD SHORTCUTS
 * ------------------
 * Enter           - Submit task (works from input field)
 * Shift + Enter   - Reserved for future multiline support
 * Tab             - Navigate to submit button
 * Space           - Activate button (when focused)
 *
 * ACCESSIBILITY
 * --------------
 * ✓ Semantic HTML (form, input, button)
 * ✓ Proper aria-labels for all interactive elements
 * ✓ Keyboard navigation support
 * ✓ Focus visible states
 * ✓ Color contrast meets WCAG AA
 * ✓ Works with screen readers
 *
 * INTEGRATION NOTES
 * -----------------
 * - Component is fully controlled externally (not responsible for state management)
 * - Parent component handles task persistence
 * - Submission handler receives raw text (no preprocessing)
 * - Loading state is internal and automatic
 * - Validation is minimal (only rejects empty strings)
 *
 * PERFORMANCE
 * -----------
 * - Small component with minimal re-renders
 * - No external dependencies (besides React)
 * - Optimized for mobile and slow networks
 * - Event debouncing built in via React's event handling
 *
 * FUTURE ENHANCEMENTS
 * --------------------
 * Consider for future versions:
 * - Natural language parsing for dates/times/tags
 * - Multiline input support (Shift+Enter)
 * - Voice input support
 * - Emoji support and custom emoji shortcuts
 * - Task templates/quick actions
 * - Recurring task suggestions
 */

// This file is for documentation only - no exports
