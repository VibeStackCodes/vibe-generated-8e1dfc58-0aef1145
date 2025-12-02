/**
 * Props for the TagsDisplay component
 */
interface TagsDisplayProps {
  tags: string[]
  maxDisplay?: number
  onTagClick?: (tag: string) => void
  variant?: 'default' | 'compact'
}

/**
 * TagsDisplay Component
 *
 * A read-only component for displaying tags/labels.
 * Features:
 * - Display multiple tags with consistent styling
 * - Show "+N more" indicator when tags exceed max display
 * - Optional click handler for tag filtering
 * - Compact and default variants
 * - Dark mode support
 * - Accessibility support
 *
 * Brand colors:
 * - Primary: #4B2FFF (purple)
 * - Uses semi-transparent backgrounds for tag display
 *
 * @param tags - Array of tags to display
 * @param maxDisplay - Maximum number of tags to show (default: all)
 * @param onTagClick - Optional callback when a tag is clicked
 * @param variant - Display variant: 'default' or 'compact' (default: 'default')
 */
export function TagsDisplay({
  tags,
  maxDisplay,
  onTagClick,
  variant = 'default',
}: TagsDisplayProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  const displayTags = maxDisplay ? tags.slice(0, maxDisplay) : tags
  const remainingCount = maxDisplay ? Math.max(0, tags.length - maxDisplay) : 0

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-1">
        {displayTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            disabled={!onTagClick}
            className="text-xs px-2 py-1 rounded-full bg-[#4B2FFF]/10 text-[#4B2FFF] font-medium hover:bg-[#4B2FFF]/20 transition-colors disabled:cursor-default focus:outline-none focus:ring-2 focus:ring-[#4B2FFF] focus:ring-offset-1 dark:focus:ring-offset-gray-950"
            type="button"
            aria-label={`Tag: ${tag}${onTagClick ? ', click to filter' : ''}`}
          >
            #{tag}
          </button>
        ))}
        {remainingCount > 0 && (
          <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-400">
            +{remainingCount}
          </span>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick?.(tag)}
          disabled={!onTagClick}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4B2FFF]/10 text-[#4B2FFF] text-sm font-medium hover:bg-[#4B2FFF]/20 transition-colors disabled:cursor-default focus:outline-none focus:ring-2 focus:ring-[#4B2FFF] focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          type="button"
          aria-label={`Tag: ${tag}${onTagClick ? ', click to filter' : ''}`}
        >
          #{tag}
        </button>
      ))}
      {remainingCount > 0 && (
        <div className="inline-flex items-center px-3 py-1 text-sm text-gray-500 dark:text-gray-400">
          +{remainingCount} more
        </div>
      )}
    </div>
  )
}
