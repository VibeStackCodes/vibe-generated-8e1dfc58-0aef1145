import { useState, useCallback } from 'react'

/**
 * Props for the TagsInput component
 */
interface TagsInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  disabled?: boolean
  allowDuplicates?: boolean
}

/**
 * TagsInput Component
 *
 * A reusable component for adding and managing multiple tags.
 * Features:
 * - Add tags via input field or Enter key
 * - Remove tags with X button or Backspace
 * - Duplicate prevention (configurable)
 * - Tag limit enforcement (default: 10)
 * - Clean, minimal UI with brand colors
 * - Dark mode support
 * - Full accessibility support
 *
 * Brand colors used:
 * - Primary: #4B2FFF (purple)
 * - Accent: #FFB800 (orange)
 *
 * @param tags - Array of current tags
 * @param onTagsChange - Callback when tags are modified
 * @param placeholder - Placeholder text for input
 * @param maxTags - Maximum number of tags allowed (default: 10)
 * @param disabled - Whether the input is disabled
 * @param allowDuplicates - Whether to allow duplicate tags (default: false)
 */
export function TagsInput({
  tags,
  onTagsChange,
  placeholder = 'Add a tag...',
  maxTags = 10,
  disabled = false,
  allowDuplicates = false,
}: TagsInputProps) {
  const [tagInput, setTagInput] = useState('')

  /**
   * Add a new tag
   */
  const handleAddTag = useCallback(() => {
    const trimmedTag = tagInput.trim().toLowerCase()

    // Validation checks
    if (!trimmedTag) return

    if (!allowDuplicates && tags.includes(trimmedTag)) {
      // Tag already exists
      setTagInput('')
      return
    }

    if (tags.length >= maxTags) {
      // Max tags reached
      return
    }

    // Add the tag
    onTagsChange([...tags, trimmedTag])
    setTagInput('')
  }, [tagInput, tags, maxTags, allowDuplicates, onTagsChange])

  /**
   * Remove a specific tag
   */
  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      onTagsChange(tags.filter((tag) => tag !== tagToRemove))
    },
    [tags, onTagsChange]
  )

  /**
   * Handle keydown events for tag input
   * - Enter: add tag
   * - Backspace with empty input: remove last tag
   */
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      // Remove last tag when backspace is pressed with empty input
      handleRemoveTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="w-full">
      {/* Tags Display */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <div
            key={tag}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4B2FFF]/10 text-[#4B2FFF] text-sm font-medium transition-colors hover:bg-[#4B2FFF]/20"
          >
            #{tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              disabled={disabled}
              className="hover:opacity-70 transition-opacity disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#4B2FFF] focus:ring-offset-1 rounded-full"
              aria-label={`Remove tag ${tag}`}
              type="button"
            >
              <svg
                width="16"
                height="16"
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
        ))}
      </div>

      {/* Tag Counter */}
      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
        {tags.length} / {maxTags} tags
      </div>

      {/* Tag Input */}
      {tags.length < maxTags && (
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#4B2FFF] focus:shadow-lg focus:shadow-[#4B2FFF]/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Tag input"
          />
          <button
            onClick={handleAddTag}
            disabled={!tagInput.trim() || disabled}
            className="px-3 py-2 rounded-lg font-medium text-white bg-[#4B2FFF] hover:bg-[#3d24cc] active:bg-[#2f1aa3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-max text-sm focus:outline-none focus:ring-2 focus:ring-[#4B2FFF] focus:ring-offset-2 dark:focus:ring-offset-gray-950"
            type="button"
            aria-label="Add tag"
          >
            Add
          </button>
        </div>
      )}

      {/* Max Tags Reached Message */}
      {tags.length >= maxTags && (
        <div className="text-xs text-gray-500 dark:text-gray-400 italic">
          Maximum {maxTags} tags reached
        </div>
      )}
    </div>
  )
}
