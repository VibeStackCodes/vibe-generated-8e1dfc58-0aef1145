/**
 * Tags Components Specification
 *
 * This file documents the complete specification for TagsInput and TagsDisplay components.
 * These components provide comprehensive tag/label management functionality for the NoTODO task management system.
 *
 * @module Tags Components
 * @requires React 19.2.0+
 * @requires TypeScript 5.9.3+
 * @requires Tailwind CSS 4.1.17+
 */

/**
 * ============================================================================
 * TAGSINIPUT COMPONENT SPECIFICATION
 * ============================================================================
 *
 * Purpose:
 * --------
 * The TagsInput component provides a complete interface for adding and managing
 * multiple tags with input validation, duplicate prevention, and keyboard navigation.
 *
 * Use Cases:
 * - Task editing and creation
 * - Bulk tag operations
 * - Project/list categorization
 * - Any feature requiring user-input tag management
 *
 * Features:
 * --------
 * 1. Add Tags:
 *    - Text input field with placeholder
 *    - "Add" button to submit
 *    - Enter key binding for submission
 *    - Automatic trimming and lowercase conversion
 *
 * 2. Remove Tags:
 *    - X button on each tag
 *    - Backspace key with empty input removes last tag
 *    - Visual feedback on hover
 *
 * 3. Validation:
 *    - Duplicate prevention (configurable)
 *    - Tag limit enforcement (default: 10)
 *    - Empty input rejection
 *    - Trimmed input processing
 *
 * 4. UI/UX:
 *    - Displays tag count (e.g., "3 / 10 tags")
 *    - Disables input when max reached
 *    - Shows informative messages
 *    - Responsive design
 *    - Dark mode support
 *    - Brand colors: #4B2FFF primary, #FFB800 accent
 *
 * 5. Accessibility:
 *    - ARIA labels for all interactive elements
 *    - Keyboard navigation support
 *    - Focus management
 *    - Screen reader friendly
 *
 * Props:
 * -----
 * interface TagsInputProps {
 *   tags: string[]                    // Current tags array
 *   onTagsChange: (tags: string[]) => void  // Change callback
 *   placeholder?: string              // Input placeholder (default: "Add a tag...")
 *   maxTags?: number                  // Max tags allowed (default: 10)
 *   disabled?: boolean                // Disable input (default: false)
 *   allowDuplicates?: boolean         // Allow duplicate tags (default: false)
 * }
 *
 * Events & Callbacks:
 * ------------------
 * - onTagsChange: Called when tags are added or removed
 *   Payload: Updated tags array
 *
 * Keyboard Shortcuts:
 * ------------------
 * - Enter: Add current input as tag
 * - Backspace (with empty input): Remove last tag
 *
 * Styling:
 * --------
 * - Uses Tailwind CSS utility classes
 * - Primary color: #4B2FFF
 * - Supports light and dark modes
 * - Border radius: 0.5rem (8px)
 * - Responsive gap sizing
 *
 * Example Usage:
 * ---------------
 * import { TagsInput } from '@/components/tags-input'
 *
 * export function MyComponent() {
 *   const [tags, setTags] = useState<string[]>([])
 *
 *   return (
 *     <TagsInput
 *       tags={tags}
 *       onTagsChange={setTags}
 *       placeholder="Add tags..."
 *       maxTags={5}
 *       disabled={false}
 *     />
 *   )
 * }
 *
 * Implementation Notes:
 * --------------------
 * 1. Tags are stored in lowercase for consistency
 * 2. Whitespace is trimmed from all inputs
 * 3. The last tag can be deleted with Backspace
 * 4. Input is cleared after successful tag addition
 * 5. Duplicate check is case-insensitive
 * 6. Max tags validation prevents adding beyond limit
 * 7. Component doesn't validate tag format (alphanumeric, etc.)
 *
 */

/**
 * ============================================================================
 * TAGSDISPLAY COMPONENT SPECIFICATION
 * ============================================================================
 *
 * Purpose:
 * --------
 * The TagsDisplay component provides a read-only interface for displaying
 * collections of tags with optional filtering capability and compact layout options.
 *
 * Use Cases:
 * - Task list item display
 * - Task detail view (read-only section)
 * - Tag filtering through click handler
 * - Search results display
 * - Tag cloud/summary views
 *
 * Features:
 * --------
 * 1. Display Modes:
 *    - Default: Full-size tags with "+N more" indicator
 *    - Compact: Smaller tags suitable for list items
 *
 * 2. Limiting:
 *    - Optional maxDisplay prop to show subset of tags
 *    - "+N more" indicator for hidden tags
 *    - All tags available via click handlers
 *
 * 3. Interaction:
 *    - Optional click handler for each tag
 *    - Visual feedback on hover
 *    - Propagates tag value to callback
 *
 * 4. UI/UX:
 *    - Responsive flex layout
 *    - Gap-based spacing
 *    - Dark mode support
 *    - Brand colors: #4B2FFF primary
 *    - Consistent with TagsInput styling
 *
 * 5. Accessibility:
 *    - ARIA labels
 *    - Focus management for interactive tags
 *    - Keyboard navigation support
 *
 * Props:
 * -----
 * interface TagsDisplayProps {
 *   tags: string[]                    // Tags to display
 *   maxDisplay?: number               // Max tags to show (optional)
 *   onTagClick?: (tag: string) => void // Tag click handler (optional)
 *   variant?: 'default' | 'compact'   // Display size (default: 'default')
 * }
 *
 * Variants:
 * ---------
 * 1. default:
 *    - Full-size tag pills
 *    - Text: "medium" (0.875rem)
 *    - Padding: px-3 py-1
 *    - Best for detailed views
 *
 * 2. compact:
 *    - Smaller tag pills
 *    - Text: "small" (0.75rem)
 *    - Padding: px-2 py-1
 *    - Best for list items
 *
 * Return Value:
 * ---------------
 * - null if tags array is empty
 * - JSX with tag pills otherwise
 *
 * Example Usage:
 * ---------------
 * import { TagsDisplay } from '@/components/tags-display'
 *
 * // Read-only display
 * <TagsDisplay tags={['work', 'urgent']} />
 *
 * // With limit
 * <TagsDisplay tags={['work', 'urgent', 'important']} maxDisplay={2} />
 *
 * // Compact for list
 * <TagsDisplay
 *   tags={task.tags}
 *   maxDisplay={2}
 *   variant="compact"
 * />
 *
 * // With filtering
 * <TagsDisplay
 *   tags={allTags}
 *   onTagClick={(tag) => filterByTag(tag)}
 *   maxDisplay={3}
 * />
 *
 * Implementation Notes:
 * --------------------
 * 1. Component returns null if no tags (not empty div)
 * 2. Tag display is read-only (no edit functionality)
 * 3. Click handler is optional (button still renders without it)
 * 4. Maximum display defaults to showing all tags
 * 5. "+N more" label shows remaining tag count
 * 6. Styling remains consistent across variants
 * 7. Dark mode automatically applied based on parent context
 *
 */

/**
 * ============================================================================
 * SHARED SPECIFICATIONS
 * ============================================================================
 *
 * Colors & Branding:
 * ------------------
 * Primary Color: #4B2FFF (Purple)
 *   - Used for active states, focus rings, buttons
 *   - Used for tag backgrounds (with 10% opacity)
 *   - Used for tag text color
 *
 * Accent Color: #FFB800 (Orange)
 *   - Reserved for future use
 *   - Not currently used in tags components
 *
 * Semantic Colors:
 *   - Gray-50/900: Backgrounds
 *   - Gray-100/800: Borders
 *   - Gray-200/700: Hover states
 *   - Gray-400/600: Secondary text
 *
 * Typography:
 * -----------
 * Font Family: Inter (from CLAUDE.md)
 * Font Sizes:
 *   - Tags: 0.875rem (14px) default, 0.75rem (12px) compact
 *   - Labels: 0.875rem (14px)
 *   - Counter: 0.75rem (12px)
 *
 * Spacing:
 * --------
 * Gap between tags: 0.5rem (8px)
 * Gap in tag contents: 0.5rem (8px)
 * Padding in tags:
 *   - Default: px-3 py-1 (12px 4px)
 *   - Compact: px-2 py-1 (8px 4px)
 *
 * Dark Mode:
 * ----------
 * Both components fully support dark mode:
 * - Use dark: prefixed Tailwind classes
 * - Backgrounds adapt automatically
 * - Text colors adapt automatically
 * - Focus rings adapt automatically
 * - Borders adapt automatically
 *
 * Accessibility Standards:
 * ----------------------
 * - WCAG 2.1 Level AA compliance
 * - Focus visible on all interactive elements
 * - ARIA labels on all buttons
 * - Keyboard navigation support
 * - Color contrast ratios meet standards
 * - Screen reader friendly
 *
 * Performance:
 * ----------
 * - Use React.memo for optimization if needed
 * - No unnecessary re-renders
 * - Efficient array operations
 * - Small bundle size
 *
 * Browser Support:
 * ---------------
 * - Modern browsers (Chrome, Firefox, Safari, Edge)
 * - iOS Safari 12+
 * - Android Chrome
 * - No IE11 support
 *
 */

/**
 * ============================================================================
 * INTEGRATION GUIDE
 * ============================================================================
 *
 * With Task System:
 * ----------------
 * Tags are integrated into the Task interface:
 *
 * interface Task {
 *   id: string
 *   title: string
 *   description?: string
 *   priority: TaskPriority
 *   tags: string[]              // Tags array
 *   completed: boolean
 *   createdAt: Date
 *   dueDate?: Date
 * }
 *
 * In TaskDetailModal:
 * -------------------
 * <label className="block text-sm font-semibold ...">
 *   Tags
 * </label>
 * <TagsInput
 *   tags={tags}
 *   onTagsChange={setTags}
 *   placeholder="Add a tag..."
 *   maxTags={10}
 *   disabled={isSaving || isDeleting}
 * />
 *
 * In HomePage Task List:
 * ----------------------
 * {task.tags && task.tags.length > 0 && (
 *   <TagsDisplay
 *     tags={task.tags}
 *     maxDisplay={2}
 *     variant="compact"
 *   />
 * )}
 *
 */

/**
 * ============================================================================
 * TESTING SPECIFICATIONS
 * ============================================================================
 *
 * Unit Tests - TagsInput:
 * -----------------------
 * 1. Adding Tags:
 *    - Can add valid tag
 *    - Cannot add empty tag
 *    - Cannot add duplicate
 *    - Cannot exceed max limit
 *
 * 2. Removing Tags:
 *    - Can remove via X button
 *    - Can remove via Backspace
 *    - Cannot remove from empty list
 *
 * 3. Input Handling:
 *    - Enter key adds tag
 *    - Backspace with empty input removes tag
 *    - Input trimmed and lowercased
 *    - Input cleared after add
 *
 * 4. Props:
 *    - Respects disabled state
 *    - Respects maxTags
 *    - Respects allowDuplicates
 *
 * Unit Tests - TagsDisplay:
 * -------------------------
 * 1. Display:
 *    - Shows all tags when no limit
 *    - Shows limited tags with maxDisplay
 *    - Shows "+N more" when limit exceeded
 *    - Returns null when empty
 *
 * 2. Variants:
 *    - Renders correct size for default
 *    - Renders correct size for compact
 *
 * 3. Interaction:
 *    - Calls onTagClick when provided
 *    - No click handler when not provided
 *    - Passes correct tag value
 *
 * Integration Tests:
 * ------------------
 * 1. With TaskDetailModal:
 *    - Tags can be added while editing
 *    - Tags are persisted after save
 *    - Tags display in task list
 *
 * 2. With HomePage:
 *    - Tags display in task items
 *    - Can open task detail to edit tags
 *    - Tags persist across navigation
 *
 */

/**
 * ============================================================================
 * VERSION HISTORY
 * ============================================================================
 *
 * v1.0 (Initial Release)
 * ----------------------
 * - TagsInput component with add/remove functionality
 * - TagsDisplay component with read-only display
 * - Full TypeScript support
 * - Dark mode support
 * - Accessibility support
 * - Integration with TaskDetailModal and HomePage
 * - Usage examples provided
 *
 */

export interface TagsComponentsSpecification {
  version: '1.0'
  components: {
    tagsInput: {
      name: 'TagsInput'
      description: 'Input component for adding and managing tags'
      file: 'tags-input.tsx'
      exported: true
    }
    tagsDisplay: {
      name: 'TagsDisplay'
      description: 'Display component for showing tags in read-only mode'
      file: 'tags-display.tsx'
      exported: true
    }
  }
  integration: {
    taskDetailModal: 'Uses TagsInput for editing tags'
    homePage: 'Uses TagsDisplay for showing tags in task list'
  }
  accessibility: {
    wcag: '2.1 Level AA'
    keyboard: true
    screenReader: true
    focusManagement: true
  }
  darkMode: true
  responsive: true
}
